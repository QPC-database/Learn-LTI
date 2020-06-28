import React, { useState, useEffect, useRef } from 'react';
import { IThemeOnlyProps, IStylesOnly } from '../../Core/Utils/FluentUI/typings.fluent-ui';
import { styled, MessageBar, MessageBarType, IMessageBarStyles } from '@fluentui/react';
import { themedClassNames } from '../../Core/Utils/FluentUI';

interface PublishSuccessMessageBarProps {
  isPublished: boolean;
}
type PublishSuccessMessageBarStyles = Partial<IMessageBarStyles>;

const AUTO_HIDE_DURATION = 5000;

const PublishSuccessMessageBarInner = ({
  styles,
  isPublished
}: PublishSuccessMessageBarProps & IStylesOnly<PublishSuccessMessageBarStyles>): JSX.Element | null => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const isFirstRun = useRef<boolean>(true);
  const timer = useRef<NodeJS.Timer>();

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    []
  );

  useEffect(() => {
    if (isPublished && isFirstRun && !isFirstRun.current) {
      setIsShown(true);
      timer.current = setTimeout(() => {
        setIsShown(false);
      }, AUTO_HIDE_DURATION);
    }
  }, [isPublished]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  });

  if (isShown) {
    return (
      <MessageBar messageBarType={MessageBarType.success} isMultiline={false} styles={themedClassNames(styles)}>
        Your assignment was published successfully
      </MessageBar>
    );
  }
  return null;
};

const publishSuccessMessageBarStyles = ({ theme: _theme }: IThemeOnlyProps): PublishSuccessMessageBarStyles => ({
  root: [
    {
      width: 'auto',
      marginLeft: 'auto'
    }
  ]
});

export const PublishSuccessMessageBar = styled(PublishSuccessMessageBarInner, publishSuccessMessageBarStyles);