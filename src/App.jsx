import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut} from 'firebase/auth';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Login from './Login';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const firebaseConfig = {
  apiKey: "AIzaSyALwgtdT-4AuXug69JFMuOF6D3qnkhhZ3k",
  authDomain: "netseva-fd9c8.firebaseapp.com",
  projectId: "netseva-fd9c8",
  storageBucket: "netseva-fd9c8.firebasestorage.app",
  messagingSenderId: "224786850515",
  appId: "1:224786850515:web:ead0c4285646bbbe5faa26",
  measurementId: "G-8D72G15KHN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const heatLayer = L.heatLayer(
      data.map(p => [p.location.lat, p.location.lon, Math.min(p.download / 20, 1)]),
      { radius: 25, blur: 15, maxZoom: 10 }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ setSpeedData] = useState([]);
  const [providerInput, setProviderInput] = useState('Jio');
  const [lastTestResult, setLastTestResult] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    navigator.geolocation.getCurrentPosition((pos) => {
    setLocation({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
    });
  }, []);

  useEffect(() => {
    if (location) {
      setSelectedLocation({ lat: location.lat, lon: location.lon });
    }
  }, [location]);

  const onMarkerDragEnd = (event) => {
    const marker = event.target;
    const position = marker.getLatLng();
    setSelectedLocation({ lat: position.lat, lon: position.lng });
  };

  function MapClickHandler({ setSelectedLocation }) {
    useMapEvents({
      click(e) {
        setSelectedLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });
    return null;
  }

  const runSpeedTest = async () => {
    const download = Math.random() * 10 + 2;
    const upload = Math.random() * 5 + 1;
    const ping = Math.random() * 50 + 10;

    if (!selectedLocation || !user) {
    console.log('No location or user');
    return;
    }

    const docRef = await addDoc(collection(db, 'speedTests'), {
      userId: user.uid,
      provider: providerInput,
      ping,
      download,
      upload,
      location: selectedLocation,
      timestamp: new Date().toISOString(),
    });

    setLastTestResult({
      provider: providerInput,
      download,
      upload,
      ping,
    });

    console.log('Speed test added:', docRef.id);
    alert(`✅ Speed Test Successful!\n\n📍 Location: (${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lon.toFixed(4)})\n📡 Provider: ${providerInput}\n📥 Download: ${download.toFixed(1)} Mbps\n📤 Upload: ${upload.toFixed(1)} Mbps\n🕒 Ping: ${ping.toFixed(0)} ms`);
    await loadData();
  };

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, 'speedTests'));
    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data()));
    console.log('Loaded data:', data);
    setSpeedData(data);
  };

  useEffect(() => {
    loadData();
  }, []);
  
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully");
    } catch (error) {
      console.error('Logout error:', error);
      alert("Logout failed");
    }
  };

  return (
    <div className="p-4 font-sans min-h-screen">
      <h1
        style={{
        fontSize: '2rem',          
        fontWeight: '700',       
        marginBottom: '1rem',      
        color: 'white',          
        textAlign: 'center',       
        letterSpacing: '-0.02em',  
        fontFamily: 'Manrope, sans-serif',
        }}
      >
      📡 NetSeva
      </h1>

      {!user ? (
        <Login /> 
      ) : (
        <>
          <div className="mb-4">
            <div>
              <p
                style={{
                  color: 'white',
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  alignItems: 'center',
                }}
              > Hello, {user.displayName} 👋</p>
              <button
                onClick={logout}
                style={{
                  backgroundColor: 'rgb(239, 68, 68)', 
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '0.5rem',
                }}
              > Logout
              </button>
            </div>
      
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#16a34a', 
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                userSelect: 'none',
                fontWeight: '600',
                fontFamily: 'Manrope, sans-serif',
                margin: '0.7rem',
              }}
            > Provider
            <select
              value={providerInput}
              onChange={(e) => setProviderInput(e.target.value)}
              style={{
                marginLeft: '0.7rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                color: 'black',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontFamily: 'inherit',
              }}
            >
              <option>Jio</option>
              <option>Airtel</option>
              <option>Vi</option>
              <option>BSNL</option>
            </select>
            </label>

            <button
              onClick={runSpeedTest}
              style={{
                marginLeft: '1rem',
                backgroundColor: '#f5f5dc', 
                color: '#333',              
                padding: '0.30rem 0.5rem', 
                borderRadius: '0.5rem',
                fontSize: '1.25rem',       
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            > Run Speed Test
            </button>

          </div>

          <MapContainer center={[selectedLocation?.lat || 19.08, selectedLocation?.lon || 72.88]} zoom={13} scrollWheelZoom={true} className="h-[500px] w-full rounded shadow">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapClickHandler setSelectedLocation={setSelectedLocation} />
            {selectedLocation && (
              <Marker
                position={[selectedLocation.lat, selectedLocation.lon]}
                draggable={true}
                eventHandlers={{ dragend: onMarkerDragEnd }}
              >

              {lastTestResult && (
                <Popup>
                  <p><b>Provider:</b> {lastTestResult.provider}</p>
                    <p>
                      📥 {lastTestResult.download.toFixed(1)} Mbps<br />
                      📤 {lastTestResult.upload.toFixed(1)} Mbps<br />
                      🕒 {lastTestResult.ping.toFixed(0)} ms
                    </p>
                  </Popup>
                )}
              </Marker>
            )}

          </MapContainer>
        </>
      )}
    </div>
  );
}

export default App;
