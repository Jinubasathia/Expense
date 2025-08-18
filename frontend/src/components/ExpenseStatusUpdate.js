import React from "react";
import api from "../utils/api";

export default function ExpenseStatusUpdate({ expense, onUpdated }) {
  const [showReject, setShowReject] = React.useState(false);
  const [remarks, setRemarks] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  if (expense.status !== "PENDING") return null;

  const update = async (status, remarksText = "") => {
    setLoading(true);
    try {
      await api.put(`/expenses/${expense.id}/status`, { status, remarks: remarksText });
      onUpdated();
    } finally { setLoading(false); setShowReject(false); setRemarks(""); }
  };

  return (
    <>
      <button className="btn" onClick={() => update("APPROVED")}>Approve</button>
      <button className="btn outline" onClick={() => setShowReject(true)} style={{ marginLeft: 8 }}>Reject</button>

      {showReject && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>Reject Expense</h3>
            <p>Please provide remarks:</p>
            <textarea className="textarea" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            <div style={{ display:"flex", gap:8, marginTop:12 }}>
              <button className="btn"
                onClick={() => remarks.trim() ? update("REJECTED", remarks.trim()) : null}
                disabled={loading || !remarks.trim()}>
                Confirm Reject
              </button>
              <button className="btn outline" onClick={() => setShowReject(false)}>Cancel</button>
            </div>
            {!remarks.trim() && <div className="error">Remarks are required to reject</div>}
          </div>
        </div>
      )}
    </>
  );
}
