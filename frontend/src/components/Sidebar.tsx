import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

type SidebarProps = {
  scrollToOverview: () => void;
  scrollToCards: () => void;
  scrollToActivity: () => void;
  scrollToPayments: () => void;
};

const Sidebar = ({
  scrollToOverview,
  scrollToCards,
  scrollToActivity,
  scrollToPayments,
}: SidebarProps) => {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div
      className="bg-white d-flex flex-column align-items-center py-3"
      style={{
        width: '75px',
        height: '100vh',
        borderRight: '1px solid #e5e5e5',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <div
        className="bg-success d-flex align-items-center justify-content-center mb-4"
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '14px',
          cursor: 'pointer',
        }}
        onClick={scrollToOverview}
      >
        <i className="bi bi-box-fill text-white"></i>
      </div>

      {/* MENU */}
      <div className="d-flex flex-column gap-4 mt-2">
        <button
          className="btn btn-light rounded-4 p-2"
          onClick={scrollToOverview}
        >
          <i className="bi bi-house-door"></i>
        </button>

        <button
          className="btn btn-light rounded-4 p-2"
          onClick={scrollToCards}
        >
          <i className="bi bi-credit-card"></i>
        </button>

        <button
          className="btn btn-light rounded-4 p-2"
          onClick={scrollToActivity}
        >
          <i className="bi bi-graph-up"></i>
        </button>

        <button
          className="btn btn-light rounded-4 p-2"
          onClick={scrollToPayments}
        >
          <i className="bi bi-wallet2"></i>
        </button>
      </div>

      {/* USER */}
      <div className="mt-auto text-center">
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#4361EE',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '14px',
            margin: '0 auto',
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <small className="d-block mt-2 text-capitalize">
          {user?.name}
        </small>
      </div>
    </div>
  );
};

export default Sidebar;