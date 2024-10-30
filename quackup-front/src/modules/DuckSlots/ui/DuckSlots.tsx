import React, { useEffect, useRef, useState } from 'react';
import { animated, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import DuckSlotCard from 'modules/DuckSlots/components/DuckSlotCard';
import DeleteDuckIcon from 'ui/icons/button-delete-duck.svg';

import styles from './DuckSlots.module.css';
import { useAppDispatch, useAppSelector } from 'store';
import { setDuckSlots, setIsDraggingDuck } from 'store/public/slots';
import { crossDuckSlotsThunk, deleteDuckSlotThunk } from 'store/public/slots/thunk';

import { updateProfitCoin } from 'store/public/session';

const emptySlots = [null, null, null, null, null, null, null, null];

export const DuckSlots = () => {
  const dispatch = useAppDispatch();
  const deleteRef = useRef<HTMLDivElement | null>(null);
  const { duckSlotsList } = useAppSelector((state) => state.duckSlots);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [isEnableGesture, setIsEnableGesture] = useState(true);
  const isDraggingDuck = useAppSelector((state) => state.duckSlots.isDraggingDuck);

  const [springs, api] = useSprings(duckSlotsList.length, () => ({
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 10,
    touchAction: 'none',
  }));

  const bind = useDrag(
    ({ down, args: [originalIndex], movement: [mx, my], xy: [globalX, globalY], active }) => {
      api.start((index) => {
        if (index !== originalIndex) return;
        return {
          x: mx,
          y: my,
          scale: down ? 1.05 : 1,
          immediate: down,
          zIndex: 100,
        };
      });
      dispatch(setIsDraggingDuck(down));

      if (!active && slotRef.current) {
        const newRow = Math.round(my / 118);
        const newColumn = Math.round(mx / slotRef.current.offsetWidth);
        const newIndex = originalIndex + (newRow * 4 + newColumn);

        if (deleteRef.current) {
          const rect = deleteRef.current.getBoundingClientRect();
          if (
            globalX >= rect.left &&
            globalX <= rect.right &&
            globalY >= rect.top &&
            globalY <= rect.bottom
          ) {
            dispatch(deleteDuckSlotThunk(duckSlotsList[originalIndex]?.id));

            api.start({ x: 0, y: 0, zIndex: 10 });
            return;
          }
        }

        if (newIndex < 0 || newIndex > 7 || newIndex === originalIndex) {
          api.start({ x: 0, y: 0, zIndex: 10 });
          return;
        }

        const currentSlot = duckSlotsList[originalIndex];
        const possibleSlot = duckSlotsList[newIndex];

        //If possible slot is empty
        if (possibleSlot === null) {
          let updatedSlots = [...duckSlotsList];
          updatedSlots[newIndex] = updatedSlots[originalIndex];
          updatedSlots[originalIndex] = null;
          dispatch(setDuckSlots(updatedSlots));
          api.start({ x: 0, y: 0, zIndex: 10 });
          return;
        }

        //If slot level is not same
        if (possibleSlot && currentSlot.level !== possibleSlot.level) {
          const updatedSlots = [...duckSlotsList];
          [updatedSlots[originalIndex], updatedSlots[newIndex]] = [
            updatedSlots[newIndex],
            updatedSlots[originalIndex],
          ];
          dispatch(setDuckSlots(updatedSlots));

          api.start({ x: 0, y: 0, zIndex: 10 });
          return;
        }

        //If slots levels is same
        if (currentSlot.level === possibleSlot.level) {
          api.start({ x: 0, y: 0, zIndex: 10 });
          setIsEnableGesture(false);

          setTimeout(() => {
            dispatch(
              crossDuckSlotsThunk({
                firstSlotId: currentSlot.id,
                secondSlotId: possibleSlot.id,
              })
            )
              .then((resultAction: any) => {
                if (crossDuckSlotsThunk.fulfilled.match(resultAction)) {
                  const newSlot = resultAction.payload;
                  let updatedSlots = [...duckSlotsList];

                  const changeProfitCoin: any =
                    newSlot.profitPerMinute -
                    (currentSlot.profitPerMinute + possibleSlot.profitPerMinute);

                  updatedSlots[originalIndex] = null;
                  updatedSlots[newIndex] = newSlot;
                  dispatch(setDuckSlots(updatedSlots));
                  dispatch(updateProfitCoin(changeProfitCoin));
                }
              })
              .finally(() => {
                setIsEnableGesture(true);
              });
          }, 200);
          return;
        }
      }
    },
    { enabled: isEnableGesture }
  );

  return (
    <>
      <div className={styles.duckSlots}>
        {springs.map((props, i) => (
          <div key={i} ref={slotRef} className={styles.slotDuck}>
            {duckSlotsList[i] && (
              <animated.div
                style={{ ...props }}
                {...bind(i)}
                children={<DuckSlotCard slot={duckSlotsList[i]} />}
              />
            )}
            {!duckSlotsList[i] && <span>DUCK SLOT</span>}
          </div>
        ))}
      </div>
      {isDraggingDuck && (
        <div className={styles.deleteIconWrap}>
          <div ref={deleteRef} className={styles.deleteIcon}>
            <DeleteDuckIcon />
          </div>
        </div>
      )}
    </>
  );
};
