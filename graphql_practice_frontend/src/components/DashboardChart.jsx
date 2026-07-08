import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const DashboardChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={460}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 60, bottom: 10 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                    dataKey="productName"
                    type="category"
                    width={180}
                />
                <Tooltip
                    formatter={(value) => `${value.toLocaleString()}원`}
                    cursor={{ fill: "#f3f4f6" }}
                />
                <Bar
                    dataKey="totalSales"
                    fill="#4f46e5"
                    radius={[0, 10, 10, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DashboardChart;