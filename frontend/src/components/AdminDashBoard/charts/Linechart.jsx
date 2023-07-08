import { ResponsiveLine } from '@nivo/line';
import { Box } from '@mui/material';
const Linechart = ({ data, width, height }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: width,
        height: height,
        margin: 'auto',
       
        marginBottom: '40px',
        backgroundColor:"whitesmoke",
        color:"blue"
      }}
    >
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Date',
      legendOffset: 36,
      legendPosition: 'middle',
      tickTextColor: 'brown', 
      legendTextColor: 'brown', 
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Revenue',
      legendOffset: -40,
      legendPosition: 'middle',
      tickTextColor: 'brown', 
      legendTextColor: 'brown',
    }}
    lineWidth={5}
    pointSize={20}
    pointColor={{ theme: 'grid.line.stroke' }}
    pointBorderWidth={2}
    pointBorderColor={{ theme: 'labels.text.fill' }}
    pointLabelYOffset={-12}
    useMesh={true}
    colors={{ scheme: 'purpleRed_green' }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .9)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
  </Box>
)

export default Linechart;
