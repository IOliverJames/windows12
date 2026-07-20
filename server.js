// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Sample software database
const softwareList = [
  {
    id: 1,
    title: "Windows 12",
    category: "Web Apps",
    description: "Next-generation Windows experience. Download the latest preview and explore new features.",
    version: "12.0 Preview",
    rating: 4.9,
    icon: "https://via.placeholder.com/80/0078D4/FFFFFF?text=W12",
    externalUrl: "https://win12.info/"
  },
  {
    id: 2,
    title: "Notepad++",
    category: "Productivity",
    description: "Powerful source code editor with syntax highlighting and plugin support.",
    version: "8.7.1",
    rating: 4.8,
    icon: "https://via.placeholder.com/80/00A86B/FFFFFF?text=NP",
    externalUrl: "https://notepad-plus-plus.org/"
  },
  {
    id: 3,
    title: "7-Zip",
    category: "System Utilities",
    description: "High compression ratio file archiver supporting multiple formats.",
    version: "24.08",
    rating: 4.9,
    icon: "https://via.placeholder.com/80/FF6B00/FFFFFF?text=7Z",
    externalUrl: "https://www.7-zip.org/"
  },
  {
    id: 4,
    title: "Malwarebytes",
    category: "Security",
    description: "Advanced malware removal and real-time protection for Windows.",
    version: "5.1",
    rating: 4.7,
    icon: "https://via.placeholder.com/80/00BFFF/FFFFFF?text=MB",
    externalUrl: "https://www.malwarebytes.com/"
  },
  {
    id: 5,
    title: "VLC Media Player",
    category: "Media Tools",
    description: "Free and open-source multimedia player supporting virtually every format.",
    version: "3.0.21",
    rating: 4.8,
    icon: "https://via.placeholder.com/80/FF4500/FFFFFF?text=VLC",
    externalUrl: "https://www.videolan.org/vlc/"
  },
  {
    id: 6,
    title: "VS Code",
    category: "Developer Tools",
    description: "Lightweight yet powerful code editor from Microsoft with extensions.",
    version: "1.93",
    rating: 4.9,
    icon: "https://via.placeholder.com/80/007ACC/FFFFFF?text=VS",
    externalUrl: "https://code.visualstudio.com/"
  },
  {
    id: 7,
    title: "PowerToys",
    category: "System Utilities",
    description: "Set of utilities for power users to maximize productivity on Windows.",
    version: "0.85",
    rating: 4.8,
    icon: "https://via.placeholder.com/80/0078D4/FFFFFF?text=PT",
    externalUrl: "https://github.com/microsoft/PowerToys"
  },
  {
    id: 8,
    title: "qBittorrent",
    category: "Media Tools",
    description: "Advanced BitTorrent client with a clean interface and no ads.",
    version: "5.0",
    rating: 4.6,
    icon: "https://via.placeholder.com/80/00FF7F/FFFFFF?text=QB",
    externalUrl: "https://www.qbittorrent.org/"
  }
];

app.get('/api/software', (req, res) => {
  res.json(softwareList);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 WinApps Hub server running on http://localhost:${PORT}`);
});
