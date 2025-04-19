const mongoose = require("mongoose");
const listings = [
    {
      title: "Ocean Breeze Resort",
      description: "A luxurious seaside resort with breathtaking views.",
      image: "https://www.cataloniahotels.com/en/blog/wp-content/uploads/2018/07/Catalonia-Bavaro-Resort_Baja.jpg",
      price: 250,
      location: "Goa",
      country: "India",
      reviews: []
    },
    {
      title: "Mountain View Inn",
      description: "Cozy rooms surrounded by peaceful hills.",
      image: "https://news.airbnb.com/wp-content/uploads/sites/4/2020/05/Airbnb-Beachfront-Greece.jpg?fit=2662,1776",
      price: 180,
      location: "Manali",
      country: "India",
      reviews: []
    },
    {
      title: "Sahara Desert Stay",
      description: "Experience the desert like never before.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99Yhfu6cnAs9gz5BqcMPOI9GGsxuh_hIxjELkYnTJkqrXzs3g_MvJJYjd25v9MVYDZzc&usqp=CAU",
      price: 120,
      location: "Jaisalmer",
      country: "India",
      reviews: []
    },
    {
      title: "Tokyo City Capsule",
      description: "Affordable and futuristic capsule hotel.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqL6in3zwmoJwL2kWqCOD_vVfCP3y7KOdiWTrNrO205xeV_HDnsSIB3-0P78dmbJJ63w8&usqp=CAU",
      price: 60,
      location: "Tokyo",
      country: "Japan",
      reviews: []
    },
    {
      title: "Parisian Elegance",
      description: "A romantic getaway in the heart of Paris.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WpImSnO64buwicvqoHxMx5ZJVycxWfOv6DHHk-MumyCT04OwrYI2aMbKAoQ6sA8vIK0&usqp=CAU",
      price: 300,
      location: "Paris",
      country: "France",
      reviews: []
    },
    {
      title: "Bali Beach Villas",
      description: "Private villas with ocean view and infinity pool.",
      image: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAyOTI1MjI1OTYzNTE2NTM4OA%3D%3D/original/09a5368d-45d3-4d20-b4cd-2353c7d62efb.jpeg",
      price: 275,
      location: "Ubud",
      country: "Indonesia",
      reviews: []
    },
    {
      title: "New York Loft",
      description: "Stylish loft apartment in downtown Manhattan.",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/360840979.jpg",
      price: 350,
      location: "New York",
      country: "USA",
      reviews: []
    },
    {
      title: "Swiss Alpine Chalet",
      description: "Warm chalet nestled in the snowy Alps.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PfDta_hhvmz6Q4WJhaTn5k-4zEDiEn3mByw1UfNHadm4YnWM-Trxso5J_VYEQZJvhfM&usqp=CAU",
      price: 400,
      location: "Zermatt",
      country: "Switzerland",
      reviews: []
    },
    {
      title: "Santorini Cliff Suites",
      description: "Iconic white suites with sunset views.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXzZGQrvxtzRo0WEcTELxzyYMq5v8pwCCb0o7CrHf_HqIWonS8aHFCwl5zFoDC5FTtVBI&usqp=CAU",
      price: 310,
      location: "Santorini",
      country: "Greece",
      reviews: []
    },
    {
      title: "Dubai Sky Towers",
      description: "Ultra-modern hotel with skyline view.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8U7HFvwoo6fUzwhKIn1-MyzYgGYVX2xkMDNhqne4A8OLRbRL1oN-YHIREP0HosNYjbQ&usqp=CAU",
      price: 500,
      location: "Dubai",
      country: "UAE",
      reviews: []
    },
    {
      title: "Himalayan Eco Lodge",
      description: "Reconnect with nature in the Himalayas.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgcVNQ_xXOxo1LXlfNAKL51wVTqinl8U1RsY_IffCsFMsfxfRrQVCo35Ofrkh9YCDTbjk&usqp=CAU",
      price: 130,
      location: "Rishikesh",
      country: "India",
      reviews: []
    },
    {
      title: "Venice Canal Retreat",
      description: "Romantic stays by the canal in Venice.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWWjFqDgpO83Wkvns7J9o81RHolJfAY6uBhaHRKinAVYJF-zuX9bdlh2KiY5M8XxWnNXc&usqp=CAU",
      price: 280,
      location: "Venice",
      country: "Italy",
      reviews: []
    },
    {
      title: "Sydney Harbour Hotel",
      description: "Watch fireworks from your suite balcony.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 320,
      location: "Sydney",
      country: "Australia",
      reviews: []
    },
    {
      title: "Toronto Lakefront Inn",
      description: "Scenic lake view and city skyline.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 210,
      location: "Toronto",
      country: "Canada",
      reviews: []
    },
    {
      title: "Cape Town Mountain Stay",
      description: "Breathtaking Table Mountain view.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 190,
      location: "Cape Town",
      country: "South Africa",
      reviews: []
    },
    {
      title: "Bangkok Riverside Hotel",
      description: "Modern luxury by the Chao Phraya river.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 150,
      location: "Bangkok",
      country: "Thailand",
      reviews: []
    },
    {
      title: "Kashmir Houseboat",
      description: "Unique floating hotel experience.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 110,
      location: "Srinagar",
      country: "India",
      reviews: []
    },
    {
      title: "Petra Desert Camp",
      description: "Desert glamping near the ancient city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 95,
      location: "Petra",
      country: "Jordan",
      reviews: []
    },
    {
      title: "Maldives Overwater Villa",
      description: "Crystal clear waters and private decks.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 600,
      location: "Male",
      country: "Maldives",
      reviews: []
    },
    {
      title: "Reykjavik Northern Lights Lodge",
      description: "Stay under the aurora-filled skies.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4shs4NcPjiY-Aohw7UuH0wMx-aqjdaLYgXnllJCle9yVYfGI_hVSt0wAktsFq-5ic0U&usqp=CAU",
      price: 260,
      location: "Reykjavik",
      country: "Iceland",
      reviews: []
    }
  ]
module.exports = listings;  
