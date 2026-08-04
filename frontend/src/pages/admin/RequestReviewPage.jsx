import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageTitle } from '@/components/common/PageTitle';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Overlay } from '@/components/modals/Overlay';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/hooks/useToast';
import { paths } from '@/routes/paths';
import './RequestReviewPage.css';

const OWNER_ROWS = [
  { label: 'Owner Name', value: <b style={{ color: 'var(--text)' }}>Mahmudul Hasan</b> },
  {
    label: 'Phone Number',
    value: (
      <b className="num" style={{ color: 'var(--text)' }}>
        +880 1811 223 344 <span className="badge green nodot">OTP Verified</span>
      </b>
    ),
  },
  {
    label: 'National ID (NID)',
    value: (
      <b className="num" style={{ color: 'var(--text)' }}>
        1994 2233 4455 667
      </b>
    ),
  },
  {
    label: 'Account Standing',
    value: <b style={{ color: 'var(--brand)' }}>Active Player since 2024 (No flags)</b>,
  },
];

const VENUE_ROWS = [
  { label: 'Venue Name', value: <b style={{ color: 'var(--text)' }}>Kick Off Arena</b> },
  {
    label: 'Address',
    value: <b style={{ color: 'var(--text)' }}>House 12, Road 27, Dhanmondi, Dhaka</b>,
  },
  { label: 'Supported Sports', value: <b>Football · Futsal</b> },
  { label: 'Pitch Capacity', value: <b>3 Pitches (Two 7-a-side, One Indoor Futsal)</b> },
  {
    label: 'Duplicate Geolocation Check',
    value: <b style={{ color: 'var(--brand)' }}>No duplicate listing found ✓</b>,
  },
];

const REJECTION_REASONS = [
  'Invalid or Expired Documents',
  'Unverifiable Location / Address',
  'Duplicate Listing Detected',
  'Policy Violation',
];

const DOC_TABS = [
  { id: 'license', label: 'Trade License' },
  { id: 'lease', label: 'Lease Agreement' },
  { id: 'nid', label: 'Owner NID' },
];

function TradeLicenseDoc() {
  return (
    <div
      style={{
        background: '#ffffff',
        color: '#111827',
        padding: 28,
        borderRadius: 12,
        fontFamily: "'Courier New', Courier, monospace",
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        width: '100%',
        border: '1.5px solid var(--border-soft)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          borderBottom: '2px double #111827',
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#0f766e',
            letterSpacing: '0.05em',
          }}
        >
          Dhaka South City Corporation
        </h4>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>
          Unified Business Trade License
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          fontSize: 12,
          lineHeight: 1.5,
          color: '#1f2937',
        }}
      >
        <div>
          <strong>License Number:</strong> TR-DSCC-2026-448102
        </div>
        <div>
          <strong>Business Name:</strong> Kick Off Arena
        </div>
        <div>
          <strong>Licensee / Owner:</strong> Mahmudul Hasan
        </div>
        <div>
          <strong>Nature of Business:</strong> Commercial Sports &amp; Recreation Arena
        </div>
        <div>
          <strong>Registered Address:</strong> House 12, Road 27, Dhanmondi, Dhaka
        </div>
        <div>
          <strong>Issue Date:</strong> July 10, 2025
        </div>
        <div>
          <strong>Expiry Date:</strong> June 30, 2027
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
          textAlign: 'right',
          borderTop: '1px dashed #9ca3af',
          paddingTop: 12,
        }}
      >
        <span style={{ fontSize: 11, color: '#4b5563', fontStyle: 'italic' }}>
          Digitally Verified by DSCC Authority
        </span>
      </div>
    </div>
  );
}

function LeaseAgreementDoc() {
  return (
    <div
      style={{
        background: '#fefefe',
        color: '#1f2937',
        padding: 24,
        borderRadius: 12,
        fontFamily: 'serif',
        lineHeight: 1.6,
        border: '1px solid #d1d5db',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        maxHeight: 340,
        overflowY: 'auto',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h4
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#1e3a8a',
          }}
        >
          DEED OF LEASE AGREEMENT
        </h4>
        <span style={{ fontSize: 11, color: '#4b5563' }}>Value: ৳10,000 Non-Judicial Stamp</span>
      </div>
      <p style={{ fontSize: 11, marginBottom: 8 }}>
        This DEED OF LEASE is made on this 1st day of January, 2024, by Mr. Ahmed Ali (Lessor) and
        Mahmudul Hasan (Lessee).
      </p>
      <p style={{ fontSize: 11, marginBottom: 8 }}>
        <strong>SUBJECT MATTER:</strong> Commercial rooftop leased for construction and operation of
        futsal/football arenas at House 12, Road 27, Dhanmondi, Dhaka.
      </p>
      <p style={{ fontSize: 11, marginBottom: 8 }}>
        <strong>TERM OF LEASE:</strong> 10 Years (January 2024 to December 2034) with option to renew.
      </p>
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          borderTop: '1px solid #e5e7eb',
          paddingTop: 12,
        }}
      >
        <div>
          <strong>Lessor Sign:</strong> [Ahmed Ali]
        </div>
        <div>
          <strong>Lessee Sign:</strong> [Mahmudul Hasan]
        </div>
      </div>
    </div>
  );
}

function OwnerNidDoc() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
        color: '#ffffff',
        padding: '16px 20px',
        borderRadius: 12,
        width: '100%',
        maxWidth: 320,
        margin: '0 auto',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        border: '1px solid #14b8a6',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          paddingBottom: 6,
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }}>
          People&apos;s Republic of Bangladesh
        </span>
        <span style={{ fontSize: 11 }}>🪪 NID</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div
          style={{
            width: 64,
            height: 76,
            background: '#e5e7eb',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#374151',
            fontSize: 24,
            fontWeight: 800,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          👤
        </div>
        <div style={{ flex: 1, fontSize: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div>
            <strong>Name:</strong> Mahmudul Hasan
          </div>
          <div>
            <strong>Father&apos;s Name:</strong> Karim Hasan
          </div>
          <div>
            <strong>Date of Birth:</strong> 12 Oct 1994
          </div>
          <div style={{ marginTop: 4 }}>
            <strong style={{ color: '#fcd34d' }}>NID No:</strong> 1994 2233 4455 667
          </div>
        </div>
      </div>
    </div>
  );
}

const DOC_VIEWS = {
  license: <TradeLicenseDoc />,
  lease: <LeaseAgreementDoc />,
  nid: <OwnerNidDoc />,
};

/** Small score header shown above the owner and venue detail cards. */
function ScoreHeader({ label, value, percent }) {
  return (
    <div
      className="between"
      style={{
        alignItems: 'center',
        marginBottom: 18,
        background: 'rgba(34, 197, 94, 0.05)',
        padding: '12px 16px',
        borderRadius: 12,
        border: '1px solid rgba(34, 197, 94, 0.12)',
      }}
    >
      <div>
        <span
          className="subtle tiny"
          style={{ fontWeight: 700, color: 'var(--text-3)', display: 'block' }}
        >
          {label}
        </span>
        <b style={{ fontSize: 15, color: 'var(--mint)' }}>{value}</b>
      </div>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '3px solid var(--mint)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          color: 'var(--mint)',
        }}
      >
        {percent}
      </div>
    </div>
  );
}

export default function RequestReviewPage() {
  const { requestId = 'TR-1042' } = useParams();
  const { showToast } = useToast();
  const approve = useDisclosure(false);
  const reject = useDisclosure(false);
  const [activeDoc, setActiveDoc] = useState('license');
  const [rejectReason, setRejectReason] = useState(REJECTION_REASONS[0]);
  const [rejectNote, setRejectNote] = useState('');

  const activeDocLabel = DOC_TABS.find((tab) => tab.id === activeDoc).label;

  const confirmRejection = () => {
    reject.close();
    showToast('Request rejected and logged to audit trail');
  };

  return (
    <>
      <PageTitle title={`Review Request ${requestId}`} />

      <Breadcrumbs
        items={[
          { label: 'Admin', to: paths.admin.dashboard },
          { label: 'Turf Requests', to: paths.admin.turfRequests },
          { label: requestId },
        ]}
      />

      <div className="main-header" style={{ marginBottom: 24 }}>
        <div>
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <Link
              className="btn btn-sm btn-tertiary"
              to={paths.admin.turfRequests}
              style={{ padding: '4px 10px', fontWeight: 700 }}
            >
              ← Back
            </Link>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Review Turf Listing Request</h1>
          </div>
          <span className="subtle small" style={{ marginTop: 4, display: 'block' }}>
            {requestId} · Kick Off Arena
          </span>
        </div>
      </div>

      <div className="between" style={{ flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div className="row-wrap">
            <span className="badge amber">Pending Review</span>
            <span className="subtle small">Submitted today at 2:14 PM · Wait time: 4 hours</span>
          </div>
        </div>
        <div className="row" style={{ gap: 6 }}>
          <button
            className="btn btn-tertiary btn-sm"
            type="button"
            onClick={() => showToast('Loading TR-1041...')}
          >
            ‹ Prev Request
          </button>
          <button
            className="btn btn-tertiary btn-sm"
            type="button"
            onClick={() => showToast('Loading TR-1038...')}
          >
            Next Request ›
          </button>
        </div>
      </div>

      <div className="grid2" style={{ alignItems: 'start', gap: 24 }}>
        {/* Left Column: Owner profile, Venue details */}
        <div className="stack" style={{ gap: 24 }}>
          <section className="card" style={{ padding: 24, borderRadius: 20 }}>
            <ScoreHeader label="OWNER TRUST SCORE" value="98 / 100 · Excellent" percent="98%" />
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 800 }}>Owner Profile</h3>
            <div className="stack-sm" style={{ gap: 10 }}>
              {OWNER_ROWS.map((row) => (
                <div className="between small" key={row.label}>
                  <span className="muted">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
          </section>

          <section className="card" style={{ padding: 24, borderRadius: 20 }}>
            <ScoreHeader
              label="VENUE VALIDATION SCORE"
              value="95 / 100 · Passes Metrics"
              percent="95%"
            />
            <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 800 }}>Venue Details</h3>
            <div className="stack-sm" style={{ gap: 10 }}>
              {VENUE_ROWS.map((row) => (
                <div className="between small" key={row.label}>
                  <span className="muted">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Document Inspector tabbed viewer */}
        <div className="stack">
          <section
            className="card"
            style={{
              padding: 24,
              minHeight: 580,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 20,
            }}
          >
            <div
              className="between"
              style={{
                marginBottom: 16,
                borderBottom: '1px solid var(--border-soft)',
                paddingBottom: 12,
                alignItems: 'center',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
                  Submitted Documents Inspector
                </h3>
                <span className="subtle tiny" style={{ marginTop: 2, display: 'block' }}>
                  Select document tab below to inspect files inline
                </span>
              </div>
              <span className="badge green nodot">{activeDocLabel}</span>
            </div>

            <div
              className="glass-pill-group"
              style={{ marginBottom: 20, display: 'flex', gap: 4, width: '100%' }}
            >
              {DOC_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={tab.id === activeDoc ? 'glass-pill active' : 'glass-pill'}
                  type="button"
                  style={{ flex: 1, textAlign: 'center' }}
                  onClick={() => setActiveDoc(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: 12,
                padding: 20,
                border: '1px dashed var(--border-soft)',
                minHeight: 385,
              }}
            >
              {DOC_VIEWS[activeDoc]}
            </div>

            <div className="row" style={{ marginTop: 16, justifyContent: 'flex-end', gap: 8 }}>
              <button
                className="btn btn-sm btn-secondary"
                type="button"
                onClick={() => showToast('Document downloaded successfully 📥')}
              >
                Download Inspected PDF
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Decisions card flow */}
      <div
        className="card"
        style={{
          marginTop: 24,
          padding: 24,
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Administrative Decisions</h3>
          <span className="subtle small">
            Actions will verify {requestId} immediately and update the live turf listing
          </span>
        </div>
        <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn btn-ghost-danger"
            type="button"
            onClick={reject.open}
            style={{ minHeight: 40, padding: '0 20px', fontWeight: 700 }}
          >
            Reject Request
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => showToast('Change request notice sent to owner ✉️')}
            style={{ minHeight: 40, padding: '0 20px', fontWeight: 700 }}
          >
            Request Changes
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={approve.open}
            style={{ fontWeight: 800, minHeight: 40, padding: '0 24px' }}
          >
            ✓ Approve Venue Listing
          </button>
        </div>
      </div>

      <Overlay
        isOpen={approve.isOpen}
        onClose={approve.close}
        title="Approve Kick Off Arena?"
        hideHeader
        className="center"
      >
        <div className="check-anim" aria-hidden="true">
          ✓
        </div>
        <h3 style={{ marginBottom: 8 }}>Approve Kick Off Arena?</h3>
        <p className="muted small" style={{ marginBottom: 16 }}>
          This will create an official venue listing for <b>Mahmudul Hasan</b> and send an approval
          notification SMS/Email.
        </p>
        <div className="stack-sm">
          <Link className="btn btn-primary btn-block" to={paths.admin.turfs}>
            Confirm &amp; Publish Listing →
          </Link>
          <button className="btn btn-tertiary btn-block" type="button" onClick={approve.close}>
            Cancel
          </button>
        </div>
      </Overlay>

      <Overlay isOpen={reject.isOpen} onClose={reject.close} title="Reject Turf Request" hideHeader>
        <h3 style={{ marginBottom: 4 }}>Reject Turf Request</h3>
        <p className="subtle small" style={{ marginBottom: 14 }}>
          Select a reason to inform the venue owner.
        </p>
        <div className="field">
          <label htmlFor="rjReason">Rejection Category</label>
          <select
            className="select"
            id="rjReason"
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
          >
            {REJECTION_REASONS.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="rjNote">Feedback for Owner</label>
          <textarea
            className="input"
            id="rjNote"
            placeholder="Explain what needs to be fixed..."
            value={rejectNote}
            onChange={(event) => setRejectNote(event.target.value)}
          />
        </div>
        <div className="stack-sm" style={{ marginTop: 14 }}>
          <button className="btn btn-danger btn-block" type="button" onClick={confirmRejection}>
            Confirm Rejection
          </button>
          <button className="btn btn-tertiary btn-block" type="button" onClick={reject.close}>
            Cancel
          </button>
        </div>
      </Overlay>
    </>
  );
}
