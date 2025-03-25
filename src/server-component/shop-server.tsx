export async function fetchProducts() {
    try {
      const query = `*[_type == "product"]{ _id, name, description, "image": image.asset->url, price }`;
      const url = `https://srkj07q7.api.sanity.io/v2023-05-03/data/query/production?query=${encodeURIComponent(query)}`;
      
      console.log("Fetching data from:", url);
      
      const response = await fetch(url);
      const data = await response.json();
  
      console.log("API Response:", data);
  
      return data.result || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  