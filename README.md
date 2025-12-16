# 🌡️ TempXchange

TempXchange is a modern, real-time temperature converter web application built using **HTML, CSS, and JavaScript**.  
It converts temperatures between **Celsius (°C), Fahrenheit (°F), and Kelvin (K)** with an elegant UI, smart feedback, and organized conversion history.

---

## 🚀 Features

- 🔄 **Real-time temperature conversion**
- 🌡️ Supports **Celsius, Fahrenheit, and Kelvin**
- 🎨 **Color-based temperature feedback**
  - ❄️ Cold  
  - 🌤️ Moderate  
  - 🔥 Hot
- 🧠 **Smart temperature descriptions**
  - Absolute zero
  - Freezing point of water
  - Normal body temperature
  - Boiling point of water
- 🕒 **Conversion history**
  - Stores last 5 conversions
  - Uses `localStorage`
  - Saves only after user stops typing (debounced)
- 🔁 **Swap units instantly**
- 🌙 **Dark mode toggle**
- ✨ **Glassmorphism UI**
- 🌈 **Animated gradient background**

---

## 🧠 Smart UX Design

- Uses **debouncing** to avoid saving partial inputs (e.g., typing `3` before `32`)
- Separates **real-time conversion** from **history storage**
- Prevents duplicate entries in history

---

## 🛠️ Technologies Used

- **HTML5** – Structure
- **CSS3** – Styling, animations, glassmorphism
- **JavaScript (Vanilla)** – Logic, DOM manipulation, debouncing, localStorage

---

## 📂 Project Structure

TempXchange/<br>
├── index.html # Main HTML file<br>
├── style.css # Styling and animations<br>
├── script.js # Conversion logic and interactivity<br>
├── favicon.png # Application icon<br>
└── README.md # Project documentation<br>


---

## ▶️ How to Run

1. Download or clone the project
2. Ensure all files are in the same folder
3. Open `index.html` in a web browser

---

## 🧪 Example Conversions

- `0 °C → 32 °F`
- `100 °C → 373.15 K`
- `-273 °C → 0 K (Absolute Zero)`
---


## 👩‍💻 Author

**Upasana Sarkar**

---

⭐ If you like this project, feel free to star it or build on top of it!
