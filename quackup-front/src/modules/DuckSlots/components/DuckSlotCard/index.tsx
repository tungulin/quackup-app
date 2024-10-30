import styles from './DuckSlotCard.module.css';

type SlotType = {
  id: string;
  name: string;
  level: number;
  image: string;
};

type DuckSlotCardProps = {
  slot: SlotType | undefined;
};

// todo: add DuckSlotCardProps
const DuckSlotCard = ({ slot }: any) => {
  return (
    <div style={{ position: 'relative' }}>
      {slot.image && <img src={slot.image} alt="Duck" className={styles.imgStyles} />}
      <div className={styles.slotLevel}>{slot.level}</div>
    </div>
  );
};

export default DuckSlotCard;
