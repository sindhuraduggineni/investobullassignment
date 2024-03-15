import React, { useState, useEffect } from 'react';

const StockTable = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
useEffect(() => {
    fetch("https://intradayscreener.com/api/openhighlow/cash")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <table border="1px solid black" border-collapse="collapse" width="100%">
        <thead style={{backgroundColor:"#D6EEEE"}}>
          <tr>
            <th>Symbol</th>
            <th>LTP <span class="glyphicon glyphicon-info-sign"></span></th>
            <th >Momentum  <span class="glyphicon glyphicon-info-sign"></span></th>

            <th>Open  <span class="glyphicon glyphicon-info-sign"></span></th>
            <th>Todays Range  <span class="glyphicon glyphicon-info-sign"></span></th>

            <th>openHighLowSignal  <span class="glyphicon glyphicon-info-sign"></span></th>

          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr  key={item.symbol}>
              <td style={{color:"blue"}}><input type="checkbox"/>    {item.symbol}</td>
              <td>{item.ltp}</td>

              <td> <button style={{
              backgroundColor: ' hwb(110 17% 0% / 0.523)', 
             color: 'green',
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            transition: 'box-shadow 0.3s ease-in-out', 
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'} /* Darker shadow on hover */
            onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'} /* Original shadow on mouse leave */
            >
              {item.high}
              </button>
              </td>
                        <td>{item.open}</td>

                        <td>
  <div style={{ backgroundColor: '#ddd', width: '50%', borderRadius: '5px' }}>
    <div style={{ backgroundColor: 'green', width: `${item.pctChange}%`, height: '5px', borderRadius: '5px' }}></div>
  </div>
</td>
                  
                      <td><span style={{
                        padding: '5px 10px',
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        borderRadius: '10px',
                        display: 'inline-block',
                        margin: '2px',
                        backgroundColor: item.openHighLowSignal.includes('High') ? 'red' : 'green'
                      }}>
                        {item.openHighLowSignal.includes('High') ? '↓ Open=High' : '↑ Open=Low'}
                      </span>
                    </td>


            <td></td>
            </tr>
          ))}


        
        </tbody>

        
        
      </table>
    );
  }
}

export default StockTable;

