
type searchProps = {
    search_query: string;
    how_many: string
}

export async function getSearch(searchProps: searchProps) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/search?search_query=${searchProps.search_query}&how_many=${searchProps.how_many}`,
        {
          method: "GET",
        }
      );
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json()
      console.log(data)

      return data
  
    } catch (err) {
      console.error(err);
      throw err
    }
  }
  