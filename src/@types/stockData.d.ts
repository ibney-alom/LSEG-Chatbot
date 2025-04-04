interface IStock {
  code: string;
  stockName: string;
  price: number;
}

interface IStockExchange {
  code: string;
  stockExchange: string;
  topStocks: IStock[];
}
export { IStock, IStockExchange };
