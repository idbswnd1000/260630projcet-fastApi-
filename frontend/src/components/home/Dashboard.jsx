import React from 'react'
import styled from 'styled-components'
import { useDashboard } from '../../store/hooks/useDashboard.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const Dashboard = () => {
  const { kpi, userRanking, productRanking } = useDashboard()

  const userChartData = {
    labels: userRanking.map(item => item.name),
    datasets: [
      {
        label: '구매 건수',
        data: userRanking.map(item => item.count),
        backgroundColor: [
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#2563eb',
          '#3b82f6'
        ],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 18
      }
    ]
  }

  const productChartData = {
    labels: productRanking.map(item => item.name),
    datasets: [
      {
        label: '판매 수량',
        data: productRanking.map(item => item.quantity),
        backgroundColor: [
          '#7c3aed',
          '#8b5cf6',
          '#a78bfa',
          '#c4b5fd',
          '#7c3aed',
          '#8b5cf6',
          '#a78bfa',
          '#c4b5fd',
          '#7c3aed',
          '#8b5cf6'
        ],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 18
      }
    ]
  }

  const chartOption = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      x: {
        grid: {
          color: '#e2e8f0'
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#334155',
          font: {
            size: 13,
            weight: '700'
          }
        }
      }
    }
  }

  return (
    <Container>
      <Title>BI Dashboard</Title>

      <KpiGrid>
        <KpiCard>
          <KpiLabel>💰 총 매출액</KpiLabel>
          <KpiValue>{kpi.totalSalesAmount.toLocaleString()}원</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiLabel>📦 총 판매수량</KpiLabel>
          <KpiValue>{kpi.totalQuantity.toLocaleString()}개</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiLabel>🧾 총 주문건수</KpiLabel>
          <KpiValue>{kpi.totalOrderCount.toLocaleString()}건</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiLabel>👥 고객 수</KpiLabel>
          <KpiValue>{kpi.customerCount.toLocaleString()}명</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiLabel>🛒 상품 수</KpiLabel>
          <KpiValue>{kpi.productCount.toLocaleString()}개</KpiValue>
        </KpiCard>
      </KpiGrid>

      <ChartGrid>
        <ChartCard>
          <ChartTitle>고객 구매 랭킹 TOP 10</ChartTitle>
          <ChartBox>
            <Bar data={userChartData} options={chartOption} />
          </ChartBox>
        </ChartCard>

        <ChartCard>
          <ChartTitle>상품 판매 랭킹 TOP 10</ChartTitle>
          <ChartBox>
            <Bar data={productChartData} options={chartOption} />
          </ChartBox>
        </ChartCard>
      </ChartGrid>
    </Container>
  )
}

export default Dashboard

const Container = styled.div`
  min-height: 100vh;
  padding: 32px;
  background: linear-gradient(135deg, #eff6ff, #f8fafc);
`

const Title = styled.h1`
  font-size: 42px;
  font-weight: 900;
  margin: 0 0 28px 0;

  background: linear-gradient(90deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`

const KpiCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6);
  color: white;

  padding: 24px;
  border-radius: 24px;
  overflow: hidden;

  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    top: -30px;
    right: -30px;
  }
`

const KpiLabel = styled.div`
  position: relative;
  z-index: 1;
  font-size: 15px;
  font-weight: 700;
  opacity: 0.95;
`

const KpiValue = styled.div`
  position: relative;
  z-index: 1;
  font-size: 32px;
  font-weight: 900;
  margin-top: 12px;
  letter-spacing: -1px;
`

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

const ChartCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 24px;

  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;

  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
  }
`

const ChartTitle = styled.h3`
  margin: 0 0 18px 0;
  font-size: 20px;
  font-weight: 900;
  color: #1e293b;
`

const ChartBox = styled.div`
  height: 380px;
`