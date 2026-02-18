import { RECON_ITEMS, RECON_TYPE_OPTIONS } from '../constants';
import type { ReconType } from '../types';
import { Modal, Button, Textarea } from '@/components/ui';
import styled from 'styled-components';

const ItemCard = styled.label`
  display: flex;
  cursor: pointer;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const TypeWrap = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

interface ReconciliationModalProps {
  isOpen: boolean;
  selectedReconType: ReconType;
  selectedReconItems: string[];
  reconComments: string;
  onClose: () => void;
  onProcess: () => void;
  onTypeChange: (value: ReconType) => void;
  onToggleItem: (itemId: string) => void;
  onCommentsChange: (value: string) => void;
}

const ReconciliationModal = ({
  isOpen,
  selectedReconType,
  selectedReconItems,
  reconComments,
  onClose,
  onProcess,
  onTypeChange,
  onToggleItem,
  onCommentsChange,
}: ReconciliationModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reconciliation Process"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={onProcess}>
            Process Reconciliation
          </Button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Reconciliation Type</label>
          <div style={{ display: 'grid', gap: 8 }}>
            {RECON_TYPE_OPTIONS.map((type) => (
              <TypeWrap key={type.value}>
                <input
                  type="radio"
                  name="reconType"
                  value={type.value}
                  checked={selectedReconType === type.value}
                  onChange={(e) => onTypeChange(e.target.value as ReconType)}
                />
                <span>{type.label}</span>
              </TypeWrap>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Select Items to Reconcile</label>
          <div style={{ display: 'grid', gap: 10 }}>
            {RECON_ITEMS.map((item) => (
              <ItemCard key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedReconItems.includes(item.id)}
                  onChange={() => onToggleItem(item.id)}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>{item.category}</div>
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 700 }}>{item.amount}</div>
                  </div>
                </div>
              </ItemCard>
            ))}
          </div>
        </div>

        <div>
          <Textarea
            rows={4}
            maxLength={500}
            label="Comments (Optional)"
            value={reconComments}
            onChange={(e) => onCommentsChange(e.target.value)}
            placeholder="Add any notes or comments about this reconciliation..."
          />
          <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>{reconComments.length}/500 characters</div>
        </div>
      </div>
    </Modal>
  );
};

export default ReconciliationModal;
