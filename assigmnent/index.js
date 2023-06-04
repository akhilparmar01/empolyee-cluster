var employees = [
    { id: 1, name: "John Doe", department: "Sales", address: "123 Main St", latitude: 40.7128, longitude: -74.0060 },
    { id: 2, name: "Jane Smith", department: "Marketing", address: "456 Elm St", latitude: 37.7749, longitude: -122.4194 },
  
];

var map = L.map('map').setView([0, 0], 2);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


var markers = L.markerClusterGroup();


employees.forEach(function (employee) {
    var marker = L.marker([employee.latitude, employee.longitude]);

    
    var popupContent =
        '<a href="#" onclick="showEmployeePopup(' +
        employee.id +
        ')">' +
        employee.name +
        '</a><br>' +
        'Department: ' +
        employee.department +
        '<br>' +
        'Address: ' +
        employee.address;

    marker.bindPopup(popupContent);
    markers.addLayer(marker);
});


map.addLayer(markers);


function showEmployeePopup(empId) {
    var employee = employees.find(function (emp) {
        return emp.id === empId;
    });

    if (employee) {
        
        alert(
            'Employee ID: ' +
                employee.id +
                '\nName: ' +
                employee.name +
                '\nDepartment: ' +
                employee.department +
                '\nAddress: ' +
                employee.address
        );
    }
}


function searchEmployees() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        
        markers.addTo(map);
    } else {
        
        markers.eachLayer(function (marker) {
            var employeeName = marker.getPopup().getContent().toLowerCase();

            if (employeeName.includes(searchTerm)) {
                marker.addTo(map);
            } else {
                map.removeLayer(marker);
            }
        });
    }
}