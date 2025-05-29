// netseva-starter: Minimal React + Firebase + Leaflet + Speed Test App

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs
} from 'firebase/firestore';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged
} from 'firebase/auth';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Import the functions you need from the SDKs you need

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALwgtdT-4AuXug69JFMuOF6D3qnkhhZ3k",
  authDomain: "netseva-fd9c8.firebaseapp.com",
  projectId: "netseva-fd9c8",
  storageBucket: "netseva-fd9c8.firebasestorage.app",
  messagingSenderId: "224786850515",
  appId: "1:224786850515:web:ead0c4285646bbbe5faa26",
  measurementId: "G-8D72G15KHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


function App() {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  // const [speedData, setSpeedData] = useState([]);
  const [setSpeedData] = useState([]);
  const [providerInput, setProviderInput] = useState('Jio');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lastTestResult, setLastTestResult] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

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


  const runSpeedTest = async () => {
    // Fake test values for demo — replace with LibreSpeed integration
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

  // Save result to show in popup
  setLastTestResult({
    provider: providerInput,
    download,
    upload,
    ping,
  });

   console.log('Speed test added:', docRef.id);

    alert(`✅ Speed Test Successful!\n\n📍 Location: (${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lon.toFixed(4)})\n📡 Provider: ${providerInput}\n📥 Download: ${download.toFixed(1)} Mbps\n📤 Upload: ${upload.toFixed(1)} Mbps\n🕒 Ping: ${ping.toFixed(0)} ms`);
    // loadData();
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

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">📡 NetSeva</h1>
      {!user ? (
        <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">Login with Google</button>
      ) : (
        <>
          <div className="mb-4">
            <p className="mb-2">Hello, {user.displayName} 👋</p>
            <label>Provider:
              <select className="ml-2 p-1 border" value={providerInput} onChange={(e) => setProviderInput(e.target.value)}>
                <option>Jio</option>
                <option>Airtel</option>
                <option>Vi</option>
                <option>BSNL</option>
              </select>
            </label>
            <button className="ml-4 bg-green-600 text-white px-3 py-1 rounded" onClick={runSpeedTest}>
              Run Speed Test
            </button>
          </div>

          <MapContainer center={[selectedLocation?.lat || 19.08, selectedLocation?.lon || 72.88]} zoom={13} scrollWheelZoom={true} className="h-[500px] w-full rounded shadow">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

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

            {/* {speedData
  .filter(s =>
    !(s.location.lat === selectedLocation?.lat && s.location.lon === selectedLocation?.lon)
  )
  .map((s, idx) => (
    <Marker key={idx} position={[s.location.lat, s.location.lon]}>
      <Popup>
        <p><b>Provider:</b> {s.provider}</p>
        <p>📥 {s.download.toFixed(1)} Mbps<br />📤 {s.upload.toFixed(1)} Mbps<br />🕒 {s.ping.toFixed(0)} ms</p>
      </Popup>
    </Marker>
))} */}


          </MapContainer>
        </>
      )}
    </div>
  );
}

export default App;
