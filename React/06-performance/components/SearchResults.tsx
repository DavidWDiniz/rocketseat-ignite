import {ProductItem} from "./ProductItem";
import {List, ListRowRenderer} from "react-virtualized";

interface SearchResultsProps {
  totalPrice: number
  results: {
    id: number
    price: number
    title: string
    priceFormatted: string
  }[]
  onAddToWishList: (id: number) => void
}

export function SearchResults({results, onAddToWishList, totalPrice}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishList}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>{totalPrice}</h2>

      <List rowCount={results.length} rowHeight={25} width={900} height={300} rowRenderer={rowRenderer} overscanRowCount={5} />
    </div>
  )
}