document.addEventListener('DOMContentLoaded', () => {
    const defaultSchedule = {
        "6:00 AM": ["Wake Up", "Wake Up", "Wake Up", "Wake Up", "Wake Up", "Wake Up", "Wake Up"],
        "6:15 AM": ["Morning Workout", "Morning Workout", "Morning Workout", "Morning Workout", "Morning Workout", "Morning Workout", "Morning Workout"],
        "7:15 AM": ["Healthy Breakfast", "Healthy Breakfast", "Healthy Breakfast", "Healthy Breakfast", "Healthy Breakfast", "Healthy Breakfast", "Healthy Breakfast"],
        "8:00 AM": ["Skill Practice", "Skill Practice", "Skill Practice", "Skill Practice", "Skill Practice", "Skill Practice", "Skill Practice"],
        "9:00 AM": ["Work Session", "Work Session", "Work Session", "Work Session", "Work Session", "Work Session", "Work Session"],
        "12:00 PM": ["Lunch Break", "Lunch Break", "Lunch Break", "Lunch Break", "Lunch Break", "Lunch Break", "Lunch Break"],
        "1:00 PM": ["Work Session", "Work Session", "Work Session", "Work Session", "Work Session", "Work Session", "Work Session"],
        "4:00 PM": ["Study/Cert Prep", "Study/Cert Prep", "Study/Cert Prep", "Study/Cert Prep", "Study/Cert Prep", "Study/Cert Prep", "Study/Cert Prep"],
        "6:00 PM": ["Evening Exercise", "Evening Exercise", "Evening Exercise", "Evening Exercise", "Evening Exercise", "Evening Exercise", "Evening Exercise"],
        "7:00 PM": ["Dinner", "Dinner", "Dinner", "Dinner", "Dinner", "Dinner", "Dinner"],
        "8:00 PM": ["Personal Time", "Personal Time", "Personal Time", "Personal Time", "Personal Time", "Personal Time", "Personal Time"],
        "10:00 PM": ["Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep", "Sleep"]
    };

    // Load schedule from localStorage or default
    function loadSchedule() {
        const savedSchedule = JSON.parse(localStorage.getItem('schedule')) || defaultSchedule;
        const table = document.querySelector('.schedule-table tbody');
        for (let row of table.rows) {
            const time = row.cells[0].innerText;
            for (let i = 1; i < row.cells.length; i++) {
                row.cells[i].innerText = savedSchedule[time][i - 1];
            }
        }
    }

    // Save schedule to localStorage
    function saveSchedule() {
        const schedule = {};
        const table = document.querySelector('.schedule-table tbody');
        for (let row of table.rows) {
            const time = row.cells[0].innerText;
            schedule[time] = [];
            for (let i = 1; i < row.cells.length; i++) {
                schedule[time].push(row.cells[i].innerText);
            }
        }
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }

    // Set up the schedule and event listeners
    loadSchedule();

    // Add click event to table cells for editing
    const tableCells = document.querySelectorAll('.schedule-table td:not(:first-child)');
    tableCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const task = prompt('Enter task for this time slot:', cell.innerText);
            if (task !== null) {
                cell.innerText = task;
                saveSchedule();
            }
        });
    });

    // Reset to default schedule
    document.getElementById('resetButton').addEventListener('click', () => {
        localStorage.removeItem('schedule');
        loadSchedule();
    });

    // Highlight current day
    const currentDay = new Date().getDay();
    const tableHeaders = document.querySelectorAll('.schedule-table th');
    if (currentDay > 0 && currentDay <= 7) { // Monday to Sunday
        tableHeaders[currentDay].style.backgroundColor = '#ff9800';
    }
});
