<template>
  <div class="chart card">
      <div class="card-header">
          <h6>Spendings Per Day (Last 31 Days)</h6>
      </div>
      <div class="card-body">
          <canvas ref='chart'></canvas>
      </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref, watch } from 'vue';
export default {
    props: ['labels', 'data'],
    setup(props) {
        const chart = ref(null)
        let chartjs = undefined
        
        onMounted(() => {
            chartjs = new Chart(chart.value, {
                type: "line",
                data: {
                    labels: props.labels,
                    datasets: [{
                        label: 'Spendings',
                        backgroundColor: '#01b0db',
                        borderColor: '#025b7f',
                        data: props.data
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }
            })
        })

        //we can use 'watch' to detect when a variable (or in this case, a prop) is changed
        //it's useful since onUpdated doesn't always detect when a prop is changed exactly
        watch(() => [props.labels, props.data], () => {
            chartjs.destroy()
            chartjs = new Chart(chart.value, {
                type: "line",
                data: {
                    labels: props.labels,
                    datasets: [{
                        label: 'Spendings',
                        backgroundColor: '#01b0db',
                        borderColor: '#025b7f',
                        data: props.data
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    animation: {
                        duration: 0
                    },
                    maintainAspectRatio: false
                }
            })
        })

        return { chart }
    }
};
</script>

<style scoped>
.chart {
    margin-bottom: 20px;
}

@media (min-width: 768px) {
    .card-body {
        height: 15rem;
    }
}

</style>