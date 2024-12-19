"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useSearch } from "./_hooks/useSearch";
import { ProductData } from "@/models/search";
import ExpandableCard from "./_component/ExpandableCard";
import { useReviewSummary } from "./_hooks/useReviewSummary";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [howMany, setHowMany] = useState<number>(3);
  const [asins, setAsins] = useState<ProductData>({});
  const [summaryAsins, setSummaryAsins] = useState<ProductData>({});

  const handleSearchResponse = (asins: ProductData) => {
    setAsins({})
    setSummaryAsins({})
    setAsins(asins);
  };
  const handleSummaryResponse = (asins: ProductData) => {
    setSummaryAsins(asins)
  };

  const { mutate, isPending } = useSearch(handleSearchResponse);
  const { mutate: summaryMutate, isPending: summaryIsPending} = useReviewSummary(handleSummaryResponse)

  const onSearch = () => {
    mutate({ search_query: searchQuery, how_many: howMany.toString() });
  };
  const onReviewSummary = () => {
    summaryMutate((asins))
  }

  return (
    <main className="w-full flex flex-col gap-6">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-[450px]">
          <Label htmlFor="search_query">Product</Label>
          <Input
            id="search_query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 max-w-[450px]">
          <Label htmlFor="how_many">Numbers of Serach</Label>
          <Input
            id="how_many"
            type="number"
            value={howMany}
            onChange={(e) => setHowMany(Number(e.target.value))}
          />
        </div>
      </section>
      <section>
        <Button className={`${searchQuery && howMany ? "hover:bg-[#ed1c24]" : ""} bg-slate-300 w-[450px] text-lg`} variant="outline" onClick={onSearch} disabled={isPending || !searchQuery || !howMany}>
          Search
        </Button>
      </section>
      <section className="mt-12">
      {/* <Button className="w-full" onClick={onReviewSummary} disabled={summaryIsPending}>Create Review Summary!</Button> */}
        {
          JSON.stringify(asins) !== "{}" &&
          <Button variant={'outline'} className="w-full h-12 bg-slate-300 hover:bg-[#ed1c24] text-lg" onClick={onReviewSummary} disabled={summaryIsPending}>Create Review Summary!</Button>
        }
        {asins && (
          <div className="flex flex-col gap-4 mt-6">
            {Object.entries(asins).map(([asin, product]) => (
              <Card key={asin} className="product">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{product.product_name}</CardTitle>
                  <CardDescription>{product.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  {
                    asins && JSON.stringify(summaryAsins) !== "{}" &&
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold">Positive Summary</h1>
                        <div>{summaryAsins[asin].five_star_summary?.summary}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold">Negative Summary</h1>
                        <div>{summaryAsins[asin].one_star_summary?.summary}</div>
                      </div>
                    </div>
                  }
                </CardContent>
                <CardContent>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full flex">
                      <TabsTrigger className="flex-1 font-bold" value="five">5 Star Reviews</TabsTrigger>
                      <TabsTrigger className="flex-1 font-bold" value="one">1 Star Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="five">
                      {product.five_reviews &&
                        product.five_reviews.map((five_review, i) => (
                          <ExpandableCard
                            key={five_review}
                            content={`${i + 1}. ${five_review}`}
                          />
                        ))}
                    </TabsContent>
                    <TabsContent value="one">
                      {product.one_reviews &&
                        product.one_reviews.map((one_review, i) => (
                          <ExpandableCard
                            key={one_review}
                            content={`${i + 1}. ${one_review}`}
                          />
                        ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
      {/* {
        asins && 
        <section>
          <Button variant="outline" onClick={onReview} disabled={isPending}>Get Review Summary</Button>
        </section>
      } */}
      <Toaster />
    </main>
  );
}
