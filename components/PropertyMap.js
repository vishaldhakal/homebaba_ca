"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const PropertyMap = ({ properties }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [view, setView] = useState('properties');
  const [loading, setLoading] = useState(true);
  const markersRef = useRef([]);

  // Debug log for properties
  useEffect(() => {
    console.log('Properties:', properties);
    console.log('Mapbox Token:', mapboxgl.accessToken);
  }, [properties]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: properties[0] ? [properties[0].longitude, properties[0].latitute] : [-79.3832, 43.6532],
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Fit bounds to show all properties
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        bounds.extend([property.longitude, property.latitute]);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }

    map.current.on('load', () => {
      setLoading(false);
      showProperties();
    });

    return () => {
      clearMarkers();
      map.current?.remove();
      map.current = null;
    };
  }, [properties]);

  // Clear existing markers
  const clearMarkers = () => {
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    }
  };

  // Show pre-construction properties
  const showProperties = () => {
    clearMarkers();
    setView('properties');
    setLoading(true);

    try {
      properties.forEach(property => {
        if (!property.longitude || !property.latitute) {
          console.warn('Missing coordinates for property:', property);
          return;
        }

        const el = document.createElement('div');
        el.className = 'property-marker';
        
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <h3>${property.project_name}</h3>
            <p>${property.project_address}</p>
            <p>Starting from: $${property.price_starting_from?.toLocaleString()}</p>
            <p>Type: ${property.project_type}</p>
            <p>Status: ${property.status}</p>
          `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([property.longitude, property.latitute])
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error('Error showing properties:', error);
    }
    
    setLoading(false);
  };

  // Show nearby restaurants
  const showRestaurants = async () => {
    clearMarkers();
    setView('restaurants');
    setLoading(true);

    try {
      const center = map.current.getCenter();
      console.log('Fetching restaurants near:', center.lng, center.lat);

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?` +
        `proximity=${center.lng},${center.lat}&types=poi&limit=10&access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const data = await response.json();
      console.log('Restaurant data:', data);

      data.features.forEach(restaurant => {
        const el = document.createElement('div');
        el.className = 'restaurant-marker';

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <h3>${restaurant.text}</h3>
            <p>${restaurant.place_name}</p>
            <p>Distance: ${(restaurant.properties.distance / 1000).toFixed(2)} km</p>
          `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(restaurant.center)
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
    
    setLoading(false);
  };

  // Show nearby schools
  const showSchools = async () => {
    clearMarkers();
    setView('schools');
    setLoading(true);

    try {
      const center = map.current.getCenter();
      console.log('Fetching schools near:', center.lng, center.lat);

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/school.json?` +
        `proximity=${center.lng},${center.lat}&types=poi&limit=10&access_token=${mapboxgl.accessToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch schools');
      }

      const data = await response.json();
      console.log('School data:', data);

      data.features.forEach(school => {
        const el = document.createElement('div');
        el.className = 'school-marker';

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <h3>${school.text}</h3>
            <p>${school.place_name}</p>
            <p>Distance: ${(school.properties.distance / 1000).toFixed(2)} km</p>
          `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(school.center)
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="map-container h-[calc(100vh-2rem)] sticky top-4">
      {loading && (
        <div className="map-loading">
          <div className="spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
      <div className="map-controls">
        <button
          className={`map-button ${view === 'properties' ? 'active' : ''}`}
          onClick={showProperties}
        >
          Properties
        </button>
        <button
          className={`map-button ${view === 'restaurants' ? 'active' : ''}`}
          onClick={showRestaurants}
        >
          Restaurants
        </button>
        <button
          className={`map-button ${view === 'schools' ? 'active' : ''}`}
          onClick={showSchools}
        >
          Schools
        </button>
      </div>
      <div ref={mapContainer} className="map rounded-lg shadow-lg" />
    </div>
  );
};

export default PropertyMap;