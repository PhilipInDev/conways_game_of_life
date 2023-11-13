import { useCallback, useRef } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import { debounce } from 'lodash';

const useRenderTracker = (onChange: (rendersCount?: number) => void, debounceMs: number = 1000) => {
  const rendersRef = useRef(0);

  useUpdateEffect(useCallback(debounce(() => {
    onChange(rendersRef.current);
    rendersRef.current = 0;
  }, debounceMs), []));

  useUpdateEffect(() => {
    rendersRef.current++;
  })
}


export { useRenderTracker };
