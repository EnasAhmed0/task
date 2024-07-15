
const customers = [
  {
    id: 1,
    name: "Ahmed Ali",
  },
  {
    id: 2,
    name: "Aya Elsayed",
  },
  {
    id: 3,
    name: "Mina Adel"
  },
  {
    id: 4,
    name: "Sarah Reda"
  },
  {
    id: 5,
    name: "Mohamed Sayed"
  }
];

const transactions = [
  {
    id: 1,
    customer_id: 1,
    date: "2022-01-01",
    amount: 1000
  },
  {
    id: 2,
    customer_id: 1,
    date: "2022-01-02",
    amount: 2000
  },
  {
    id: 3,
    customer_id: 2,
    date: "2022-01-01",
    amount: 550
  },
  {
    id: 4,
    customer_id: 3,
    date: "2022-01-01",
    amount: 500
  },
  {
    id: 5,
    customer_id: 2,
    date: "2022-01-02",
    amount: 1300
  },
  {
    id: 6,
    customer_id: 4,
    date: "2022-01-01",
    amount: 750
  },
  {
    id: 7,
    customer_id: 3,
    date: "2022-01-02",
    amount: 1250
  },
  {
    id: 8,
    customer_id: 5,
    date: "2022-01-01",
    amount: 2500
  },
  {
    id: 9,
    customer_id: 5,
    date: "2022-01-02",
    amount: 875
  }
];




$(document).ready(function () {
  const apiUrl = 'http://localhost:3000';
  const $customerTableBody = $('#customerTable tbody');
  const $customerFilterInput = $('#customerFilter');
  const $amountFilterInput = $('#amountFilter');
  const ctx = document.getElementById('transactionChart').getContext('2d');
  let chart;

  const displayData = (customers, transactions) => {
    $customerTableBody.empty();
    transactions.forEach((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      const row = `
        <tr>
          <td>${customer.name}</td>
          <td>${transaction.date}</td>
          <td>${transaction.amount}</td>
        </tr>
      `;
      $customerTableBody.append(row);
    });
  };

  const filterData = () => {
    const customerFilter = $customerFilterInput.val().toLowerCase();
    const amountFilter = $amountFilterInput.val();
    const filteredTransactions = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      const matchesCustomer = customer.name.toLowerCase().includes(customerFilter);
      const matchesAmount = amountFilter ? transaction.amount >= amountFilter : true;
      return matchesCustomer && matchesAmount;
    });
    displayData(customers, filteredTransactions);
    displayChart(filteredTransactions);
  };

  const displayChart = (filteredTransactions) => {
    if (chart) {
      chart.destroy();
    }

    const dates = [...new Set(filteredTransactions.map((transaction) => transaction.date))];
    const amounts = dates.map((date) =>
      filteredTransactions
        .filter((transaction) => transaction.date === date)
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    );

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Transaction Amount',
            data: amounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  };

  $customerFilterInput.on('input', filterData);
  $amountFilterInput.on('input', filterData);

  displayData(customers, transactions);
  displayChart(transactions);
});

// customerAllOpj = [
//   {
//     id:'1',
//     name:"Ahmed Ali",
//   },
//    {
//     id:'2',
//     name:"Aya Elsayed",
//   },
//   {
//     id: 3,
//     name: "Mina Adel"
//   },
//   {
//     id: 4,
//     name: "Sarah Reda"
//   },
//   {
//     id: 5,
//     name: "Mohamed Sayed"
//   },
//   newObjectData =
//   {
//     id: 1,
//     customer_id: 1,
//     date: "2022-01-01",
//     amount: 1000
//   },
//   {
//     id: 2,
//     customer_id: 1,
//     date: "2022-01-02",
//     amount: 2000
//   },
//   {
//     id: 3,
//     customer_id: 2,
//     date: "2022-01-01",
//     amount: 550
//   },
//   {
//     id: 4,
//     customer_id: 3,
//     date: "2022-01-01",
//     amount: 500
//   },
//   {
//     id: 5,
//     customer_id: 2,
//     date: "2022-01-02",
//     amount: 1300
//   },
//   {
//     id: 6,
//     customer_id: 4,
//     date: "2022-01-01",
//     amount: 750
//   },
//   {
//     id: 7,
//     customer_id: 3,
//     date: "2022-01-02",
//     amount: 1250
//   },
//   {
//     id: 8,
//     customer_id: 5,
//     date: "2022-01-01",
//     amount: 2500
//   },
//   {
//     id: 9,
//     customer_id: 5,
//     date: "2022-01-02",
//     amount: 875
//   }
// ]
// ;

// $(document).ready(function () {
//   const apiUrl = 'http://localhost:3000';
//   const $customerTableBody = $('#customerTable tbody');
//   const $customerFilterInput = $('#customerFilter');
//   const $amountFilterInput = $('#amountFilter');
//   const ctx = document.getElementById('transactionChart').getContext('2d');
//   let customers = [];
//   let transactions = [];
//   let chart;

//   const fetchData = async () => {
//     try {
//       const customerResponse = await $.getJSON(`${apiUrl}/customers`);
//       customers = customerResponse;

//       const transactionResponse = await $.getJSON(`${apiUrl}/transactions`);
//       transactions = transactionResponse;

//       displayData(customers, transactions);
//       displayChart();
//     } catch (error) {
//       console.error('Error fetching data', error);
//     }
//   };
//   // fetch('http://localhost:3000/customers')
//   //   .then((response) => {
//   //     if (!response.ok) {
//   //       throw new Error('Network response was not ok ' + response.statusText);
//   //     }
//   //     return response.json();
//   //   })
//   //   .then((data) => {
//   //     console.log('Data fetched successfully:', data);
//   //     // يمكنك الآن استخدام البيانات هنا
//   //   })
//   //   .catch((error) => {
//   //     console.error('Error fetching data:', error);
//   //   });


//   const displayData = (customers, transactions) => {
//     $customerTableBody.empty();
//     transactions.forEach((transaction) => {
//       const customer = customers.find((c) => c.id === transaction.customer_id);
//       const row = `
//         <tr>
//           <td>${customer.name}</td>
//           <td>${transaction.date}</td>
//           <td>${transaction.amount}</td>
//         </tr>
//       `;
//       $customerTableBody.append(row);
//     });
//   };

//   const filterData = () => {
//     const customerFilter = $customerFilterInput.val().toLowerCase();
//     const amountFilter = $amountFilterInput.val();
//     const filteredTransactions = transactions.filter((transaction) => {
//       const customer = customers.find((c) => c.id === transaction.customer_id);
//       const matchesCustomer = customer.name.toLowerCase().includes(customerFilter);
//       const matchesAmount = amountFilter ? transaction.amount >= amountFilter : true;
//       return matchesCustomer && matchesAmount;
//     });
//     displayData(customers, filteredTransactions);
//     displayChart();
//   };

//   const displayChart = () => {
//     if (chart) {
//       chart.destroy();
//     }

//     const customerFilter = $customerFilterInput.val().toLowerCase();
//     const filteredTransactions = transactions.filter((transaction) => {
//       const customer = customers.find((c) => c.id === transaction.customer_id);
//       return customer.name.toLowerCase().includes(customerFilter);
//     });

//     const dates = [...new Set(filteredTransactions.map((transaction) => transaction.date))];
//     const amounts = dates.map((date) =>
//       filteredTransactions
//         .filter((transaction) => transaction.date === date)
//         .reduce((sum, transaction) => sum + transaction.amount, 0),
//     );

//     chart = new chart(ctx, {
//       type: 'line',
//       data: {
//         labels: dates,
//         datasets: [
//           {
//             label: 'Transaction Amount',
//             data: amounts,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//     });
//   };

//   $customerFilterInput.on('input', filterData);
//   $amountFilterInput.on('input', filterData);

//   fetchData();
// });






