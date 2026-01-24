// ============================================
// FILE: app/api/bookings/route.js
// SIMPLER APPROACH - Fetch event type details only
// ============================================
export async function GET() {
  try {
    const CALENDLY_TOKEN = process.env.CALENDLY_API_TOKEN;
    const USER_URI = process.env.CALENDLY_USER_URI;

    if (!CALENDLY_TOKEN || !USER_URI) {
      console.error('Missing Calendly credentials');
      return Response.json({
        success: false,
        message: 'Calendly API not configured'
      });
    }

    // Fetch event types
    const eventTypesResponse = await fetch(
      `https://api.calendly.com/event_types?user=${USER_URI}`,
      {
        headers: {
          'Authorization': `Bearer ${CALENDLY_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!eventTypesResponse.ok) {
      throw new Error('Failed to fetch event types');
    }

    const eventTypesData = await eventTypesResponse.json();
    
    const trialEventType = eventTypesData.collection.find(
      event => event.name.toLowerCase().includes('trial') && event.active
    );

    if (!trialEventType) {
      return Response.json({
        success: false,
        message: 'No active trial event type found'
      });
    }

    const eventInfo = {
      name: trialEventType.name,
      duration: trialEventType.duration, // in minutes
      bookingUrl: trialEventType.scheduling_url,
      description: trialEventType.description_plain || trialEventType.description_html,
      active: trialEventType.active,
      bookingMethod: trialEventType.booking_method,
      color: trialEventType.color
    };

    const displaySlots = generateDisplaySlots(eventInfo);

    return Response.json({
      success: true,
      eventInfo: eventInfo,
      availableSlots: displaySlots,
      total: displaySlots.length,
      source: 'calendly-event-type',
      message: 'Showing trial class information from Calendly',
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Calendly API Error:', error);
    
    return Response.json({
      success: false,
      error: error.message
    });
  }
}

// Generate display slots for TODAY (or next Monday if weekend)
// This reflects your real Calendly availability: Mon-Fri, 9am-7pm
function generateDisplaySlots(eventInfo) {
  const slots = [];
  const today = new Date();
  const duration = eventInfo.duration || 30;
  let targetDate = new Date(today);
  let dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, etc.
  
  // If weekend, move to next Monday
  if (dayOfWeek === 0) {
    // Sunday - move to Monday (add 1 day)
    targetDate.setDate(today.getDate() + 1);
  } else if (dayOfWeek === 6) {
    // Saturday - move to Monday (add 2 days)
    targetDate.setDate(today.getDate() + 2);
  }
  
  const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = targetDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
  
  // Generate ALL time slots from 9am to 7pm (every 30 minutes)
  // Your Calendly hours: 9:00 AM - 7:00 PM
  const timeSlots = [];
  for (let hour = 9; hour < 19; hour++) { // 9am to 7pm (19 = 7pm in 24hr)
    for (let minute = 0; minute < 60; minute += 30) {
      const startHour = hour;
      const startMinute = minute;
      const endMinute = minute + 30;
      const endHour = endMinute >= 60 ? hour + 1 : hour;
      const adjustedEndMinute = endMinute >= 60 ? 0 : endMinute;
      
      // Don't create slot if it goes past 7pm
      if (endHour > 19 || (endHour === 19 && adjustedEndMinute > 0)) continue;
      
      const startTime = formatTime(startHour, startMinute);
      const endTime = formatTime(endHour, adjustedEndMinute);
      
      timeSlots.push({
        start: startTime,
        end: endTime
      });
    }
  }
  
  timeSlots.forEach((time, index) => {
    slots.push({
      id: index + 1,
      date: dateStr,
      day: dayName,
      time: `${time.start} - ${time.end}`,
      duration: duration,
      type: eventInfo.name,
      status: "available",
      bookingUrl: eventInfo.bookingUrl
    });
  });
  
  return slots;
}

// Helper function to format time
function formatTime(hour, minute) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}