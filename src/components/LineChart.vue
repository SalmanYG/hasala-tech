<template>
  <div class="chart card">
      <div class="card-header">
          Spendings Per Day (Last 31 Days)
      </div>
      <div class="card-body">
          <canvas ref='chart'></canvas>
      </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
export default {
    props: ['labels', 'data'],
    setup(props) {
        const chart = ref(null)
        let chartjs = undefined
        let isFirst = true
        
        onUpdated(() => {
            if(isFirst) {
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
                        }
                    }
                })
                isFirst = false
            } else {
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
                        animation: {
                            duration: 0
                        }
                    }
                })
            }
            
        })

        return { chart }
    }
};
</script>

<style scoped>
.chart {
    margin-bottom: 20px;
}

</style>