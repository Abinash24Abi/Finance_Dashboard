import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import type {
  AppDispatch,
  RootState,
} from '../app/store';

import MainLayout from '../layouts/MainLayout';

import {
  getCardsRequest,
} from '../redux/card/cardSlice';

import {
  getPaymentsRequest,
} from '../redux/payment/paymentSlice';

import {
  getTransactionsRequest,
} from '../redux/transaction/transactionSlice';

import {
  getTransfersRequest,
} from '../redux/transfer/transferSlice';

import AddCardModal from '../components/AddCardModal';

import SendMoneyModal from '../components/SendMoneyModal';

// ========== NEW IMPORT FOR ADDITIONAL COMPONENTS ==========
import NotificationsDropdown from '../components/NotificationsDropdown';
import SpendingChart from '../components/SpendingChart';
import BudgetProgress from '../components/BudgetProgress';
import RecentContacts from '../components/RecentContacts';
import CurrencyConverter from '../components/CurrencyConverter';
import InvestmentOverview from '../components/InvestmentOverview';
import UpcomingBills from '../components/UpcomingBills';
import SpendingInsights from '../components/SpendingInsights';
import GoalTracker from '../components/GoalTracker';
import NewsFeed from '../components/NewsFeed';

const Dashboard = () => {
  const dispatch =
    useDispatch<AppDispatch>();

  const [showCardModal, setShowCardModal] =
    useState(false);

  const [showSendModal, setShowSendModal] =
    useState(false);

  // ========== NEW STATE VARIABLES ==========
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [investmentReturns, setInvestmentReturns] = useState(0);

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const { cards } = useSelector(
    (state: RootState) => state.card
  );

  const { payments } = useSelector(
    (state: RootState) =>
      state.payment
  );

  const { transactions } =
    useSelector(
      (state: RootState) =>
        state.transaction
    );

  const { transfers } =
    useSelector(
      (state: RootState) =>
        state.transfer
    );

  useEffect(() => {
    dispatch(getCardsRequest());
    dispatch(getPaymentsRequest());
    dispatch(getTransactionsRequest());
    dispatch(getTransfersRequest());

    // ========== NEW DATA FETCHING ==========
    fetchWeatherData();
    fetchInvestmentData();
  }, [user]);

  useEffect(() => {
      dispatch(getCardsRequest());
      dispatch(getPaymentsRequest());
      dispatch(getTransactionsRequest());
      dispatch(getTransfersRequest());
  },[user])

  // ========== NEW FUNCTIONS ==========
  const fetchWeatherData = async () => {
    // Simulate weather API call
    setWeatherData({
      temperature: 22,
      condition: 'Sunny',
      location: 'Chennai, IND',
      icon: '☀️'
    });
  };

  const fetchInvestmentData = async () => {
    // Simulate investment API call
    setInvestmentReturns(12.5);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      dispatch(getCardsRequest()),
      dispatch(getPaymentsRequest()),
      dispatch(getTransactionsRequest()),
      dispatch(getTransfersRequest()),
    ]);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Calculate total balance across all cards
  const totalBalance = cards.reduce((sum, card: any) => sum + (card.balance || 0), 0);
  
  // Calculate monthly spending trends
  const calculateSpendingTrend = () => {
    const currentMonth = 3220; // Current expense
    const previousMonth = 2850;
    const percentageChange = ((currentMonth - previousMonth) / previousMonth) * 100;
    return {
      amount: currentMonth,
      percentage: percentageChange.toFixed(1),
      isUp: percentageChange > 0
    };
  };

  const spendingTrend = calculateSpendingTrend();

  const [currentCard, setCurrentCard] =
    useState(0);

  const selectedCard =
    cards[currentCard];

  return (
    <MainLayout>
      <div className="container-fluid">
        
        {/* ========== NEW: TOP BAR WITH GREETING, WEATHER & NOTIFICATIONS ========== */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#111827' }}>
              Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h2>
            <p className="text-secondary mb-0">
              Here's your financial overview for {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          
          <div className="d-flex gap-3 align-items-center">
            {/* Weather Widget */}
            {weatherData && (
              <div className="bg-white rounded-4 px-3 py-2 shadow-sm d-flex align-items-center gap-2">
                <span className="fs-4">{weatherData.icon}</span>
                <div>
                  <strong>{weatherData.temperature}°C</strong>
                  <small className="d-block text-secondary">{weatherData.location}</small>
                </div>
              </div>
            )}
            
            {/* Refresh Button */}
            <button 
              className="btn btn-light rounded-circle shadow-sm"
              style={{ width: '40px', height: '40px' }}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <i className={`bi bi-arrow-repeat ${isRefreshing ? 'spin' : ''}`}></i>
            </button>
            
            {/* Notifications */}
            <div className="position-relative">
              <button 
                className="btn btn-light rounded-circle shadow-sm position-relative"
                style={{ width: '40px', height: '40px' }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="bi bi-bell"></i>
                {transactions.filter((t: any) => t.status === 'Pending').length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                    {transactions.filter((t: any) => t.status === 'Pending').length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <NotificationsDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>
          </div>
        </div>

        {/* ========== NEW: QUICK STATS CARDS ========== */}
        <div className="row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="bg-gradient-primary rounded-4 p-4 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="opacity-75">Total Balance</small>
                  <h3 className="fw-bold mt-2 mb-0">£{totalBalance.toLocaleString()}</h3>
                  <small className="opacity-75">Across {cards.length} {cards.length === 1 ? 'card' : 'cards'}</small>
                </div>
                <i className="bi bi-wallet2 fs-1 opacity-50"></i>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-secondary">Monthly Spending</small>
                  <h3 className="fw-bold mt-2 mb-0">£{spendingTrend.amount.toLocaleString()}</h3>
                  <small className={`${spendingTrend.isUp ? 'text-danger' : 'text-success'}`}>
                    {spendingTrend.isUp ? '↑' : '↓'} {Math.abs(Number(spendingTrend.percentage))}% from last month
                  </small>
                </div>
                <i className="bi bi-graph-up fs-1 text-secondary opacity-50"></i>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-secondary">Investment Returns</small>
                  <h3 className="fw-bold mt-2 mb-0 text-success">+{investmentReturns}%</h3>
                  <small className="text-secondary">This quarter</small>
                </div>
                <i className="bi bi-graph-up-arrow fs-1 text-success opacity-50"></i>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-secondary">Upcoming Bills</small>
                  <h3 className="fw-bold mt-2 mb-0">{payments.length}</h3>
                  <small className="text-secondary">Due this month</small>
                </div>
                <i className="bi bi-calendar-check fs-1 text-secondary opacity-50"></i>
              </div>
            </div>
          </div>
        </div>

        {/* ========== NEW: SPENDING INSIGHTS & BUDGET PROGRESS ROW ========== */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <SpendingChart transactions={transactions} selectedTimeRange={selectedTimeRange} />
          </div>
          <div className="col-lg-6">
            <SpendingInsights transactions={transactions} cards={cards} />
          </div>
        </div>

        <div className="row g-4">
          {/* LEFT COLUMN - EXISTING CODE STARTS HERE */}
          <div className="col-xl-4">
            
            {/* ========== NEW: BUDGET PROGRESS WIDGET ========== */}
            <div className="mb-4">
              <BudgetProgress />
            </div>
            
            {/* EXISTING CARD COMPONENT - UNCHANGED */}
            <div className="bg-white rounded-4 p-4 shadow-sm h-100">
              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold">
                  My Card
                </h5>

                <button
                  className="btn border-0 fw-semibold"
                  style={{
                    color: '#18c37e',
                  }}
                  onClick={() =>
                    setShowCardModal(
                      true
                    )
                  }
                >
                  + Add Card
                </button>
              </div>

              {/* BALANCE */}
              <div className="text-center mt-4">
                <h1
                  className="fw-bold"
                  style={{
                    fontSize: '42px',
                  }}
                >
                  £
                  {selectedCard?.balance ||
                    '0.00'}
                </h1>

                <p className="text-secondary">
                  Current balance
                </p>
              </div>

             {/* CARD */}
<div
  className="p-3 p-sm-4 mt-4 text-white w-100"
  style={{
    minHeight: '220px',
    borderRadius: '25px',
    background:
      'linear-gradient(135deg,#202020,#353535)',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* BG EFFECT */}
  <div
    style={{
      position: 'absolute',
      width: '220px',
      height: '220px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      top: '-80px',
      right: '-60px',
    }}
  ></div>

  <div className="position-relative h-100 d-flex flex-column justify-content-between">
    
    {/* TOP */}
    <div className="d-flex justify-content-between align-items-start">
      <div className="flex-grow-1">
        <small className="text-light opacity-75">
          Card Holder
        </small>

        <h6
          className="mt-2 text-truncate"
          style={{ maxWidth: '180px' }}
        >
          {selectedCard?.cardHolder || user?.name}
        </h6>
      </div>

      <i className="bi bi-wifi fs-5 fs-sm-4"></i>
    </div>

    {/* CARD NUMBER */}
    <div className="my-4">
      <h5
        className="mb-0"
        style={{
          letterSpacing: '3px',
          fontSize: 'clamp(16px, 4vw, 28px)',
          wordBreak: 'break-word',
          lineHeight: '1.4',
        }}
      >
      
        {selectedCard?.cardNumber ||
          '0000 0000 0000 0000'}
      </h5>
    </div>

    {/* BOTTOM */}
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
      
      <div>
        <small className="text-light opacity-75">
          Expiry
        </small>

        <p className="mb-0 mt-1">
          {selectedCard?.expiry || '09/28'}
        </p>
      </div>

      {/* MasterCard */}
      <div className="d-flex align-items-center">
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#ff6b6b',
          }}
        ></div>

        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#ffb84d',
            marginLeft: '-10px',
          }}
        ></div>
      </div>
    </div>
  </div>
</div>
              {/* CARD SWITCH */}
              {cards.length > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  <button
                    className="btn btn-light rounded-circle"
                    style={{
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={
                      currentCard === 0
                    }
                    onClick={() =>
                      setCurrentCard(
                        currentCard - 1
                      )
                    }
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <div className="d-flex gap-2">
                    {cards.map(
                      (_: any,
                      index: number
                      ) => (
                        <div
                          key={index}
                          onClick={() =>
                            setCurrentCard(
                              index
                            )
                          }
                          style={{
                            width: '10px',
                            height:
                              '10px',
                            borderRadius:
                              '50%',
                            cursor:
                              'pointer',
                            background:
                              currentCard ===
                              index
                                ? '#18c37e'
                                : '#d1d5db',
                          }}
                        ></div>
                      )
                    )}
                  </div>
                  <button
                    className="btn btn-light rounded-circle"
                    style={{
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={
                      currentCard ===
                      cards.length - 1
                    }
                    onClick={() =>
                      setCurrentCard(
                        currentCard + 1
                      )
                    }
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              )}

              {/* ACTIONS */}
              <div className="row mt-4 text-center">
                <div
                  className="col-3"
                  onClick={() =>
                    setShowSendModal(
                      true
                    )
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="bg-light rounded-4 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height:
                        '55px',
                    }}
                  >
                    <i className="bi bi-send"></i>
                  </div>
                  <small className="d-block mt-2">
                    Send
                  </small>
                </div>
                <div className="col-3">
                  <div
                    className="bg-light rounded-4 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height:
                        '55px',
                    }}
                  >
                    <i className="bi bi-download"></i>
                  </div>
                  <small className="d-block mt-2">
                    Receive
                  </small>
                </div>
                <div className="col-3">
                  <div
                    className="bg-light rounded-4 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height:
                        '55px',
                    }}
                  >
                    <i className="bi bi-cash"></i>
                  </div>
                  <small className="d-block mt-2">
                    Request
                  </small>
                </div>
                <div className="col-3">
                  <div
                    className="bg-light rounded-4 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height:
                        '55px',
                    }}
                  >
                    <i className="bi bi-receipt"></i>
                  </div>
                  <small className="d-block mt-2">
                    Invoice
                  </small>
                </div>
              </div>

              {/* USERS - RECENT CONTACTS */}
              <div className="mt-5">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">
                    Transfer Again
                  </h5>
                  <i className="bi bi-search"></i>
                </div>
                <div className="d-flex gap-3 mt-4 overflow-auto">
                  <RecentContacts />
                </div>
              </div>

              {/* EXCHANGE RATE */}
              <div className="mt-5">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">
                    Exchange Rate
                  </h5>
                  <button className="btn btn-light btn-sm">
                    Add
                  </button>
                </div>
                <CurrencyConverter selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - EXISTING CODE CONTINUES */}
          <div className="col-xl-8">
            {/* EXISTING CASHFLOW ACTIVITY - UNCHANGED */}
            <div className="bg-white rounded-4 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <h5 className="fw-bold">
                    Cashflow Activity
                  </h5>
                  <small className="text-secondary">
                    See your activity
                  </small>
                </div>
                {/* ========== NEW: TIME RANGE SELECTOR ========== */}
                <div className="btn-group btn-group-sm">
                  <button 
                    className={`btn ${selectedTimeRange === 'week' ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedTimeRange('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`btn ${selectedTimeRange === 'month' ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedTimeRange('month')}
                  >
                    Month
                  </button>
                  <button 
                    className={`btn ${selectedTimeRange === 'year' ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedTimeRange('year')}
                  >
                    Year
                  </button>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3">
                  <small>
                    ● Income
                  </small>
                  <h2 className="fw-bold mt-2">
                    £15,520
                  </h2>
                </div>
                <div className="col-md-3">
                  <small>
                    ● Expense
                  </small>
                  <h2 className="fw-bold mt-2">
                    £3,220
                  </h2>
                </div>
              </div>

              {/* GRAPH - ENHANCED WITH DYNAMIC HEIGHTS */}
              <div
                className="d-flex align-items-end gap-2 mt-5"
                style={{
                  height: '250px',
                }}
              >
                {(() => {
                  // Dynamic graph data based on selected time range
                  const getGraphData = () => {
                    switch(selectedTimeRange) {
                      case 'week':
                        return [80, 120, 95, 150, 130, 170, 145];
                      case 'year':
                        return [100, 130, 115, 160, 140, 180, 155, 190, 170, 200, 185, 210];
                      default:
                        return [120, 170, 110, 180, 140, 200, 160, 190, 130, 210, 170, 180, 140, 220];
                    }
                  };
                  return getGraphData().map(
                    (height, index) => (
                      <div
                        key={index}
                        className="rounded-top position-relative"
                        style={{
                          width: '28px',
                          height: `${height}px`,
                          background: index % 2 === 0 ? '#18c37e' : '#b8f5d4',
                          transition: 'height 0.3s ease'
                        }}
                      >
                        <div className="position-absolute top-0 start-50 translate-middle mt-n3 opacity-0-hover">
                          <small className="bg-dark text-white rounded px-1" style={{ fontSize: '10px' }}>{height}</small>
                        </div>
                      </div>
                    )
                  );
                })()}
              </div>
            </div>

            {/* ========== NEW: GOAL TRACKER & INVESTMENT OVERVIEW ROW ========== */}
            <div className="row mt-4 g-4">
              <div className="col-lg-6">
                <GoalTracker />
              </div>
              <div className="col-lg-6">
                <InvestmentOverview investmentReturns={investmentReturns} />
              </div>
            </div>

            {/* EXISTING PAYMENTS & TRANSACTIONS SECTION */}
            <div className="row mt-4 g-4">
              <div className="col-lg-6">
                <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                      Upcoming Payments
                    </h5>
                    <button className="btn btn-sm btn-link text-decoration-none" style={{ color: '#18c37e' }}>
                      View All
                    </button>
                  </div>
                  
                  {/* ========== NEW: UPCOMING BILLS COMPONENT ========== */}
                  <UpcomingBills payments={payments} />
                  
                  {payments.length === 0 && (
                    <div className="text-center py-5">
                      <i className="bi bi-calendar-check fs-1 text-secondary opacity-50"></i>
                      <p className="text-secondary mt-2">No upcoming payments</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                      Recent Transactions
                    </h5>
                    <button className="btn btn-sm btn-link text-decoration-none" style={{ color: '#18c37e' }}>
                      See All
                    </button>
                  </div>

                  <div className="table-responsive mt-2">
                    <table className="table table-borderless">
                      <thead>
                        <tr className="text-secondary">
                          <th>Name</th>
                          <th>Status</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transfers.length > 0
                          ? transfers.slice(0, 5).map(
                              (item: any, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex align-items-center gap-2">
                                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        <i className="bi bi-person text-secondary"></i>
                                      </div>
                                      <div>
                                        <div className="fw-semibold">{item.receiverEmail?.split('@')[0]}</div>
                                        <small className="text-secondary">Transfer</small>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className={`badge ${item.status === 'Success' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} px-3 py-2`}>
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className={`fw-bold text-end ${item.status === 'Success' ? 'text-danger' : 'text-warning'}`}>
                                    -£{item.amount}
                                  </td>
                                </tr>
                              )
                            )
                          : transactions.slice(0, 5).map(
                              (item: any, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex align-items-center gap-2">
                                      <div className={`rounded-circle d-flex align-items-center justify-content-center ${item.type === 'Bills' ? 'bg-danger bg-opacity-10' : 'bg-primary bg-opacity-10'}`} style={{ width: '32px', height: '32px' }}>
                                        <i className={`bi ${item.type === 'Bills' ? 'bi-receipt' : 'bi-arrow-left-right'} text-secondary`}></i>
                                      </div>
                                      <div>
                                        <div className="fw-semibold">{item.name}</div>
                                        <small className="text-secondary">{item.type}</small>
                                      </div>
                                    </div>
                                   </td>
                                  <td>
                                    <span className={`badge ${item.status === 'Success' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} px-3 py-2`}>
                                      {item.status}
                                    </span>
                                   </td>
                                  <td className="fw-bold text-end text-danger">
                                    {item.amount}
                                  </td>
                                </tr>
                              )
                            )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== NEW: FINANCIAL TIPS & NEWS SECTION ========== */}
            <div className="row mt-4 g-4">
              <div className="col-md-6">
                <div className="bg-gradient-success rounded-4 p-4 shadow-sm text-white" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <i className="bi bi-lightbulb fs-1"></i>
                      <h5 className="fw-bold mt-3 mb-2">Financial Tip of the Day</h5>
                      <p className="mb-0 opacity-90">Save 20% of your income before paying bills to build wealth faster.</p>
                    </div>
                    <button className="btn btn-sm btn-light rounded-circle">
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <NewsFeed />
              </div>
            </div>
          </div>
        </div>

        {/* MODALS - UNCHANGED */}
        <AddCardModal
          show={showCardModal}
          close={() =>
            setShowCardModal(
              false
            )
          }
        />

        <SendMoneyModal
          show={showSendModal}
          close={() =>
            setShowSendModal(
              false
            )
          }
        />
      </div>

      {/* ========== NEW: ADDITIONAL CSS FOR ANIMATIONS ========== */}
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .opacity-0-hover {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        div[style*="height: ${'${height}px'}"]:hover .opacity-0-hover {
          opacity: 1;
        }
        .bg-gradient-primary {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }
        .bg-gradient-success {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
      `}</style>
    </MainLayout>
  );
};

export default Dashboard;