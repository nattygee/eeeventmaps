const mapContainer = document.getElementById('map-container');
const mapInner = document.getElementById('map-inner');

const mapImageCenterX = mapInner.offsetWidth / 2;
const mapImageCenterY = mapInner.offsetHeight / 2;

const zoom = panzoom(mapInner, {
    minZoom: 0.5,
    maxZoom: 5.0
});

const startingZoom = window.innerWidth > 768 ? 1.0 : 1.5;
zoom.zoomAbs(mapImageCenterX, mapImageCenterY, startingZoom);

// Filter panel toggle
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
const filterBtns = document.querySelectorAll('.filter-btn');

function updateFilterCount() {
  const activeCount = document.querySelectorAll('.filter-btn.active').length;
  filterToggle.textContent = activeCount > 0 ? `Filters (${activeCount})` : 'Filters';
}

// Start all filters active
filterBtns.forEach(btn => {
  const layer = document.getElementById(btn.dataset.layer);
  btn.classList.add('active');
  layer.style.display = 'block';
});

updateFilterCount();

filterToggle.addEventListener('click', () => {
  filterPanel.classList.toggle('open');
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const layer = document.getElementById(btn.dataset.layer);
    const isActive = btn.classList.contains('active');

    if (isActive) {
      btn.classList.remove('active');
      layer.style.display = 'none';
    } else {
      btn.classList.add('active');
      layer.style.display = 'block';
    }

    updateFilterCount();
  });
});

// Clear button
document.getElementById('clear-btn').addEventListener('click', () => {
  filterBtns.forEach(btn => {
    btn.classList.remove('active');
    document.getElementById(btn.dataset.layer).style.display = 'none';
  });
  updateFilterCount();
});