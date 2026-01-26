"use client";

import TagArea from "@/components/tagarea";
import SearchBar from "@/components/searchbar";

export default function Home() {
  return (
    <div className="">
      <SearchBar className="w-full" onChange={(value) => { console.log(value) }} />

      <TagArea className="w-full"
        tags={["Banana", "Apple", "Orange", "Grape", "Strawberry", "Banana", "Apple", "Orange", "Grape", "Strawberry", "Banana", "Apple", "Orange", "Grape", "Strawberry", "Banana", "Apple", "Orange", "Grape", "Strawberry"]}
        onSelectionChange={(tags) => { console.log(tags) }} />
    </div>
  );
}
