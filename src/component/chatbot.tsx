import React, { useEffect, useRef, useState } from "react";
import stockData from "../data/stockData.json";
import { IStock, IStockExchange } from "../@types/stockData";

function Chatbot() {
  const [selectedExchange, setSelectedExchange] =
    useState<IStockExchange | null>(null);
  const [selectedStock, setSelectedStock] = useState<IStock | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [selectedStock, selectedExchange]);

  const handleExchangeClick = (exchange: IStockExchange) => {
    if (selectedExchange) return;
    setSelectedExchange(exchange);
    setSelectedStock(null);
  };
  const handleStockSelection = (stock: IStock) => {
    if (selectedStock) return;
    setSelectedStock(stock);
  };
  const handleMainMenu = () => {
    setSelectedExchange(null);
    setSelectedStock(null);
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-header">💬 LSEG Chatbot</h1>
      <div ref={chatRef} className="chat-window">
        <div className="welcome-message">
          Hello! Welcome to LSEG. I'm here to help you.
        </div>

        {stockData && Array.isArray(stockData) && stockData?.length > 0 && (
          <>
            <div className="message-box">
              <div className="message-header">
                Please select a Stock Exchange.
              </div>
              <ul className="option-list">
                {stockData &&
                  stockData.map((exchange) => (
                    <li
                      key={exchange.code}
                      onClick={() => {
                        handleExchangeClick(exchange);
                      }}
                      className={`list-data ${
                        selectedExchange ? "disabled-list" : ""
                      }`}
                    >
                      {exchange?.stockExchange}
                    </li>
                  ))}
              </ul>
            </div>

            {selectedExchange && selectedExchange?.stockExchange && (
              <div className="user-input">
                {selectedExchange?.stockExchange}
              </div>
            )}

            {selectedExchange && selectedExchange?.topStocks && (
              <>
                <div className="message-box">
                  <div className="message-header">Please select a stock.</div>
                  <ul className="option-list">
                    {selectedExchange.topStocks.map((stock: IStock) => (
                      <li
                        key={stock.code}
                        onClick={() => handleStockSelection(stock)}
                        className={`list-data ${
                          selectedStock ? "disabled-list" : ""
                        }`}
                      >
                        {stock.stockName}
                      </li>
                    ))}
                    <li onClick={handleMainMenu} className="list-data">
                      Main Menu
                    </li>
                  </ul>
                </div>

                {selectedStock && selectedStock?.stockName && (
                  <div className="user-input">{selectedStock.stockName}</div>
                )}
              </>
            )}

            {selectedStock && selectedStock?.stockName && (
              <>
                <div className="message-box">
                  <div className="message-header">
                    Stock Price of {selectedStock?.stockName} is {selectedStock?.price}. Please select an option.
                  </div>
                  <ul className="option-list">
                    <li onClick={handleMainMenu} className="list-data">
                      Main Menu
                    </li>
                    <li
                      onClick={() => setSelectedStock(null)}
                      className="list-data"
                    >
                      Go Back
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="chatbot-footer">
        Please select an option
      </div>
    </div>
  );
}

export default Chatbot;
