import { ProductData } from "@/models/search";

export async function getReviewSummary(asins: ProductData) {
  // const dummy = {
  //       "B07WL6ZX97": {
  //           "five_reviews": [
  //               "supa gut",
  //               "ich liebe Samsung",
  //           ],
  //           "one_reviews": [
  //               "kaput",
  //               "Das Gerät wurde eher sporadisch und vergleichsweise wenig genutzt, tat ca. 4 1/2 Jahre das, was es tun sollte und dann wurde während eines Films plötzlich der Bildschirm dunkel"
  //           ],
  //           "price": "€ 371.27",
  //           "product_name": "Samsung RU7099 108 cm (43 Zoll) LED Fernseher (Ultra HD, HDR, Triple Tuner, Smart TV) [Modelljahr 2019]"
  //       },
  //   }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/summary`,
        {
          method: "POST",
          body: JSON.stringify(asins),
          headers: {
            "content-type": "application/json",
          },
          // credentials: "include",
        },
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
  