// Fetching Google Maps API Key from .env file
const googleMapsApiKey = 'AIzaSyCs-KYiEFyd1xkF-eLsSGKQ796oi37nd4E';

// Initializes Google Map
function initMap() {
    // The location of Monterrey
    const monterrey = { lat: 25.6866, lng: -100.3161 };

    // The map, centered at Monterrey
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: monterrey,
    });

    // Add a marker at Monterrey
    const marker = new google.maps.Marker({
        position: monterrey,
        map: map,
    });

    // Enable the place autocomplete feature
    const input = document.getElementById("address");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    // Update the map location and marker when a place is selected
    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            map.setZoom(14);
            marker.setPosition(place.geometry.location);
        } else {
            alert("¡No hay detalles disponibles para esta ubicación!");
        }
    });
}

// Load the Google Maps script
function loadScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // Check if script was successfully created
    if (script !== null) {
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey + '&libraries=places&callback=initMap';
        document.body.appendChild(script);
    } else {
        alert('¡Falló la carga del script de Google Maps!');
    }
}

// Listen to changes in package_count field
document.getElementById('package_count').addEventListener('change', function() {
    const packageCount = this.value;
    const packageDetails = document.getElementById('package_details');
    packageDetails.innerHTML = '';

    for (let i = 0; i < packageCount; i++) {
        const packageDetail = document.createElement('div');
        packageDetail.className = 'package-detail row';
        packageDetail.id = `package_detail_${i+1}`;

        const header = document.createElement('h3');
        header.textContent = `Paquete ${i+1}`;
        packageDetail.appendChild(header);

        const fields = ['Peso (kg)', 'Longitud (cm)', 'Ancho (cm)', 'Altura (cm)'];

        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'form-floating mb-3 col-lg-3 col-md-6';

            const input = document.createElement('input');
            input.type = 'number';
            input.id = `package_${i+1}_${field.toLowerCase().replace(' ', '_').replace('(', '').replace(')', '')}`;
            input.name = `package_${i+1}_${field.toLowerCase().replace(' ', '_').replace('(', '').replace(')', '')}`;
            input.className = 'form-control rounded-pill';
            div.appendChild(input);

            const label = document.createElement('label');
            label.textContent = field;
            label.htmlFor = input.id;
            label.className = "text-center"; // Added class here to center the text
            div.appendChild(label);

            packageDetail.appendChild(div);
        });

        packageDetails.appendChild(packageDetail);
    }
});



window.onload = function() {
    loadScript();
};
