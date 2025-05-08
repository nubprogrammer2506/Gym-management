// Navigation and Scroll Handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section, .container');

    // Function to update active link
    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Function to handle section visibility
    function handleSectionVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // Update active link and section visibility on scroll
    window.addEventListener('scroll', () => {
        updateActiveLink();
        handleSectionVisibility();
    });

    // Initial check for section visibility
    handleSectionVisibility();
});

// Diet Form Handler
document.getElementById('dietForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const goal = document.getElementById('goal').value;
    const diet = document.getElementById('diet').value;
    const activity = document.getElementById('activity').value;
  
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const activityMultiplier = {
      low: 1.2,
      moderate: 1.55,
      high: 1.75
    };
  
    let calories = Math.round(bmr * activityMultiplier[activity]);
  
    if (goal === 'gain') calories += 300;
    else if (goal === 'loss') calories -= 300;
  
    let protein = Math.round(weight * 2);
    let fats = Math.round(weight * 0.9);
    let carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);
  
    let foodSuggestions = {
      veg: "- Lentils, paneer, tofu, nuts, quinoa, spinach, berries",
      nonveg: "- Eggs, chicken, fish, brown rice, sweet potatoes, vegetables",
      vegan: "- Chickpeas, tofu, almond butter, oats, soy milk, leafy greens"
    };
  
    let result = `🎯 Daily Calorie Target: ${calories} kcal
  
  🍗 Protein: ${protein}g
  🥑 Fats: ${fats}g
  🍚 Carbohydrates: ${carbs}g
  
  🥗 Suggested Foods (${diet}):
  ${foodSuggestions[diet]}
  
  💡 Tip: Drink 3-4 liters of water per day, and ensure 7-8 hours of sleep.
  Track progress weekly and adjust your intake based on your results.`;
  
    document.getElementById('result').innerText = result;
});

// Performance Tracker Logic
document.getElementById('trackerForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const minutes = parseInt(document.getElementById('minutes').value);
    const intensity = document.getElementById('intensity').value;
  
    let burnRate;
    switch (intensity) {
      case 'low': burnRate = 4; break;
      case 'moderate': burnRate = 8; break;
      case 'high': burnRate = 12; break;
    }
  
    const caloriesBurned = burnRate * minutes;
    const performanceScore = Math.min(100, Math.round((caloriesBurned / 600) * 100));
  
    let feedback;
    if (performanceScore < 40) {
      feedback = "You're warming up. Increase either time or intensity for better results.";
    } else if (performanceScore < 70) {
      feedback = "Good job! Try to maintain this momentum.";
    } else {
      feedback = "Excellent performance! Consider a rest day if consistently above 85.";
    }
  
    document.getElementById('performanceResult').innerText = 
      `🔥 Calories Burned: ${caloriesBurned} kcal
  🏋️‍♂️ Performance Score: ${performanceScore}/100
  💬 Feedback: ${feedback}`;
});

// Gym Schedule Based on Age
function updateSchedule() {
    const ageGroup = document.getElementById('ageGroup').value;
    const output = document.getElementById('scheduleOutput');
  
    const schedules = {
      under20: [
        "Monday: Full Body Training + Cardio",
        "Tuesday: Rest or Light Activity",
        "Wednesday: Upper Body Strength",
        "Thursday: Core + HIIT",
        "Friday: Lower Body Strength",
        "Saturday: Sports/Outdoor Fun",
        "Sunday: Rest"
      ],
      "20s": [
        "Monday: Chest + Cardio",
        "Tuesday: Back + Abs",
        "Wednesday: Legs",
        "Thursday: Shoulders + HIIT",
        "Friday: Arms + Abs",
        "Saturday: Functional Training or Yoga",
        "Sunday: Rest"
      ],
      "30s": [
        "Monday: Push (Chest, Shoulders)",
        "Tuesday: Pull (Back, Biceps)",
        "Wednesday: Core + Light Cardio",
        "Thursday: Legs",
        "Friday: Yoga or Stretching",
        "Saturday: HIIT + Core",
        "Sunday: Rest"
      ],
      "40plus": [
        "Monday: Brisk Walk + Upper Body",
        "Tuesday: Rest or Yoga",
        "Wednesday: Strength (Low Impact)",
        "Thursday: Core Stability + Balance",
        "Friday: Resistance Bands + Stretch",
        "Saturday: Light Cardio + Flexibility",
        "Sunday: Rest"
      ]
    };
  
    output.innerHTML = schedules[ageGroup].map(day => `<div>${day}</div>`).join('');
}

// Load default schedule on page load
updateSchedule();
  
  