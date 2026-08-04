import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTitle } from '@/components/common/PageTitle';
import { Overlay } from '@/components/modals/Overlay';
import { Chip } from '@/components/ui/Chip';
import { adminVenues } from '@/data/admin';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/hooks/useToast';
import { paths } from '@/routes/paths';

const FILTERS = [
  'All Turfs',
  'Live',
  'Pending Setup',
  'Suspended',
  'Dhanmondi',
  'Uttara',
];

const AREAS = ['Dhanmondi', 'Mohammadpur', 'Mirpur', 'Uttara'];
const LISTING_STATUSES = ['Pending Setup', 'Live', 'Suspended'];

export default function TurfsPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const editTurf = useDisclosure(false);
  const delTurf = useDisclosure(false);
  const [filter, setFilter] = useState('All Turfs');
  const [search, setSearch] = useState('');
  const [editName, setEditName] = useState('Kick Off Arena');
  const [editArea, setEditArea] = useState('Dhanmondi');
  const [editStatus, setEditStatus] = useState('Pending Setup');
  const [editVerified, setEditVerified] = useState(true);
  const [editNote, setEditNote] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const term = search.trim().toLowerCase();
  const rows = term
    ? adminVenues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(term) ||
          venue.owner.toLowerCase().includes(term) ||
          venue.area.toLowerCase().includes(term),
      )
    : adminVenues;

  const saveChanges = () => {
    editTurf.close();
    showToast('Turf details updated and logged ✓');
  };

  const confirmDelete = () => {
    delTurf.close();
    showToast('Turf deleted — refunds queued & logged');
  };

  return (
    <>
      <PageTitle title="Manage Turfs" />

      <div className="main-header" style={{ marginBottom: 24 }}>
        <div>
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <Link
              className="btn btn-sm btn-tertiary"
              to={paths.admin.dashboard}
              style={{ padding: '4px 10px', fontWeight: 700 }}
            >
              ← Back
            </Link>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Manage Registered Turfs</h1>
          </div>
          <span className="subtle small" style={{ marginTop: 4, display: 'block' }}>
            128 Live Venues · 6 Pending Setup · 3 Suspended
          </span>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => showToast('Redirecting to New Turf Registration Form...')}
        >
          + Add New Turf
        </button>
      </div>

      {/* Filters Bar */}
      <div className="row-wrap" style={{ marginBottom: 16 }}>
        <input
          className="input"
          style={{ maxWidth: 260 }}
          placeholder="🔍 Search turf, owner, area…"
          aria-label="Search turf, owner, area"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {FILTERS.map((item) => (
          <Chip key={item} active={filter === item} onToggle={() => setFilter(item)}>
            {item}
          </Chip>
        ))}
      </div>

      {/* Turfs List Table */}
      <div className="liquid-glass table-wrap" style={{ padding: 0, borderRadius: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Turf Venue</th>
              <th>Owner</th>
              <th>Location</th>
              <th className="num">Pitches</th>
              <th className="num">Rating</th>
              <th className="num">30-Day Revenue</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((venue) => (
              <tr
                key={venue.id}
                style={{ cursor: 'pointer', background: venue.rowTone ?? undefined }}
                onClick={() => navigate(paths.admin.turfDetails(venue.id))}
              >
                <td>
                  <b>{venue.name}</b>
                  <br />
                  <span className="tiny subtle num">{venue.listSubtitle}</span>
                </td>
                <td>{venue.owner}</td>
                <td>{venue.area}</td>
                <td className="num">{venue.pitches}</td>
                <td className="num">{venue.listRating}</td>
                <td className="num">{venue.listRevenue}</td>
                <td>
                  <span className={`badge ${venue.listTone}`}>{venue.listStatus}</span>
                </td>
                {/* Row actions stop propagation so they never trigger the row link. */}
                <td style={{ textAlign: 'right' }} onClick={(event) => event.stopPropagation()}>
                  <div className="row" style={{ gap: 6, justifyContent: 'flex-end' }}>
                    {venue.listTone === 'red' ? (
                      <>
                        <Link className="btn btn-sm btn-secondary" to={paths.admin.activity}>
                          Investigate
                        </Link>
                        <button
                          className="btn btn-sm btn-tertiary"
                          type="button"
                          onClick={() =>
                            showToast('Reinstatement requires resolution of payout review')
                          }
                        >
                          Reinstate
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-secondary"
                          type="button"
                          onClick={editTurf.open}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-ghost-danger"
                          type="button"
                          onClick={delTurf.open}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Update Drawer */}
      <Overlay
        isOpen={editTurf.isOpen}
        onClose={editTurf.close}
        title="Update Turf · Kick Off Arena"
        mode="drawer"
      >
        <div className="field">
          <label htmlFor="etName">Display Name</label>
          <input
            className="input"
            id="etName"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="etArea">Area Location</label>
          <select
            className="select"
            id="etArea"
            value={editArea}
            onChange={(event) => setEditArea(event.target.value)}
          >
            {AREAS.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="etStatus">Listing Status</label>
          <select
            className="select"
            id="etStatus"
            value={editStatus}
            onChange={(event) => setEditStatus(event.target.value)}
          >
            {LISTING_STATUSES.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Verified Badge Status</label>
          <label className="checkline" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={editVerified}
              onChange={(event) => setEditVerified(event.target.checked)}
            />
            <span>Display Verified ✓ Badge on Public Listing</span>
          </label>
        </div>
        <div className="field">
          <label htmlFor="etNote">Admin Reason / Audit Note</label>
          <input
            className="input"
            id="etNote"
            placeholder="Explain why status is updated..."
            value={editNote}
            onChange={(event) => setEditNote(event.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          type="button"
          onClick={saveChanges}
          style={{ marginTop: 14 }}
        >
          Save Changes
        </button>
      </Overlay>

      {/* Delete Confirmation Modal */}
      <Overlay isOpen={delTurf.isOpen} onClose={delTurf.close} title="Remove Turf Listing?" hideHeader>
        <div className="fail-anim" aria-hidden="true">
          !
        </div>
        <h3 className="center" style={{ marginBottom: 8 }}>
          Remove Turf Listing?
        </h3>
        <div className="alert danger" style={{ margin: '12px 0', borderRadius: 12 }}>
          <span className="ico">⚠️</span>
          <div>
            <b>Impact of Deletion</b>
            <ul className="tiny" style={{ margin: '6px 0 0', paddingLeft: 16, lineHeight: 1.8 }}>
              <li>
                <b>7 active upcoming bookings</b> will be refunded (৳16,400)
              </li>
              <li>Registered players will receive instant cancellation notifications</li>
              <li>Owner payout settlements will freeze</li>
            </ul>
          </div>
        </div>
        <div className="field">
          <label htmlFor="dtConfirm">Type venue name to confirm</label>
          <input
            className="input"
            id="dtConfirm"
            placeholder="Kick Off Arena"
            value={deleteConfirm}
            onChange={(event) => setDeleteConfirm(event.target.value)}
          />
        </div>
        <div className="stack-sm" style={{ marginTop: 14 }}>
          <button className="btn btn-danger btn-block" type="button" onClick={confirmDelete}>
            Permanently Delete
          </button>
          <button className="btn btn-tertiary btn-block" type="button" onClick={delTurf.close}>
            Cancel
          </button>
        </div>
      </Overlay>
    </>
  );
}
