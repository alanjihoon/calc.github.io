document.addEventListener('DOMContentLoaded', function() {
  const monthYear = document.getElementById('month-year');
  const calendarBody = document.getElementById('calendar-body');
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const yearSelect = document.getElementById('year-select');

  const holidays = {
    '2025-01-01': '신정',
    '2025-02-27': '설날',
    '2025-02-28': '설날',
    '2025-03-01': '삼일절',
    '2025-05-05': '어린이날',
    '2025-05-06': '어린이날 대체휴일',
    '2025-06-06': '현충일',
    '2025-08-15': '광복절',
    '2025-09-04': '추석',
    '2025-09-05': '추석',
    '2025-09-06': '추석',
    '2025-10-03': '개천절',
    '2025-10-09': '한글날',
    '2025-12-25': '성탄절'
  };

  let userHolidays = JSON.parse(localStorage.getItem('userHolidays') || '{}');

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // 연도 선택 박스 채우기 (예: 2000~2030)
  for (let y = 2000; y <= 2030; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y + '년';
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }

  function renderCalendar(month, year) {
    monthYear.textContent = `${year}년 ${month + 1}월`;
    yearSelect.value = year;
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      let row = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        let cell = document.createElement('td');
        if (i === 0 && j < firstDay) {
          cell.textContent = '';
        } else if (date > daysInMonth) {
          cell.textContent = '';
        } else {
          cell.textContent = date;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

          // 오늘 날짜 강조
          if (
            date === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
          ) {
            cell.style.background = '#ffe082';
            cell.style.borderRadius = '50%';
          }

          // 국가 공휴일 표시 (빨간색)
          if (holidays[dateStr]) {
            cell.style.color = 'red';
            cell.title = holidays[dateStr];
          }

          // 사용자 정의 휴일 표시 (파란 배경)
          if (userHolidays[dateStr]) {
            cell.style.background = '#e3f2fd';
            cell.style.color = '#1976d2';
            cell.title = userHolidays[dateStr];
          }

          // 사용자 정의 휴일 추가
          cell.addEventListener('click', function() {
            const name = prompt('사용자 정의 휴일 이름을 입력하세요:');
            if (name) {
              userHolidays[dateStr] = name;
              localStorage.setItem('userHolidays', JSON.stringify(userHolidays));
              renderCalendar(currentMonth, currentYear);
            }
          });

          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
      if (date > daysInMonth) break;
    }
  }

  yearSelect.addEventListener('change', function() {
    currentYear = parseInt(this.value, 10);
    renderCalendar(currentMonth, currentYear);
  });

  prevBtn.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
      yearSelect.value = currentYear;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextBtn.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
      yearSelect.value = currentYear;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
});