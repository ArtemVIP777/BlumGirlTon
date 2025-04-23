// 1) Данные токеномики
const tokenomics = [
  { label: "Общее предложение", value: "300 000", color: "#3b82f6" },
  { label: "В обороте",        value: "6,53 %",  color: "#06b6d4" },
  { label: "Команда",          value: "16,98 %", color: "#a78bfa" },
  { label: "Рост",             value: "14,35 %", color: "#f59e0b" },
  { label: "IDO",              value: "13,33 %", color: "#10b981" },
];

const container = document.getElementById("tokenomics");
tokenomics.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.borderColor = item.color;
  card.innerHTML = `
    <h3>${item.label}</h3>
    <p>${item.value}</p>
  `;
  container.append(card);
});

// 2) График цены
async function drawChart() {
  // Пример: прямой запрос к API StonFi (CORS может потребовать прокси)
  const res = await fetch("https://api.stonfi.com/v1/price?token=EQC__tkPgz5olQPTNSd_-Ni7iwDfrNkT_droMdZbY82eUReE");
  const data = await res.json();
  const labels = data.history.map(p => new Date(p.timestamp*1000).toLocaleDateString());
  const prices = data.history.map(p => p.price);

  new Chart(
    document.getElementById("priceChart"),
    {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Цена BLUMGIRL, $",
          data: prices,
          fill: true,
          tension: 0.3
        }]
      },
      options: { 
        scales: { 
          x: { ticks: { color: "#ccc" } },
          y: { ticks: { color: "#ccc" } }
        },
        plugins: {
          legend: { labels: { color: "#eee" } }
        }
      }
    }
  );
}
drawChart().catch(console.error);

// 3) Инициализация виджета обмена
window.addEventListener("DOMContentLoaded", () => {
  if (window.StonFiSwapWidget) {
    window.StonFiSwapWidget.init({
      container: "#swapWidget",
      rpc: "https://mainnet-rpc.tonhubapi.com",
      from: "TON",
      to:   "EQC__tkPgz5olQPTNSd_-Ni7iwDfrNkT_droMdZbY82eUReE"
    });
  }
});
