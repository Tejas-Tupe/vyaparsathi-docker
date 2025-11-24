import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderPuncher from '../../pages/dashboard/Orders/OrdersPuncher.jsx';
import AddStockModal from '../../pages/dashboard/Stocks/AddStock.jsx';
import RefillStock from "../../pages/dashboard/Stocks/RefillStock.jsx";

const QuickActions = () => {
  const navigate = useNavigate();

  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isAddStockOpen, setAddStockOpen] = useState(false);
  const [isRefillOpen, setRefillOpen] = useState(false);


  return (
    <div >
      {/* Heading First */}
      <h2 className="section-heading">Quick Actions</h2>

      {/*  Buttons below heading */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Button variant="primary" onClick={() => setIsOrderOpen(true)}>
          Create Order
        </Button>

        <Button variant="secondary" onClick={() => {setRefillOpen(true)}}>
          Refill Stock
        </Button>

        <Button variant="secondary" onClick={() => setAddStockOpen(true)}>
          Add New Stock
        </Button>
      </div>

      {/* Order Puncher Modal */}
      <OrderPuncher isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} />
      {/* Add Stock Modal */}
      <AddStockModal isOpen={isAddStockOpen} onClose={() => setAddStockOpen(false)} />
      {/* Refill Stock Modal */}
      <RefillStock isOpen={isRefillOpen} onClose={() => setRefillOpen(false)} />
    </div>
  );
};

export default QuickActions;
