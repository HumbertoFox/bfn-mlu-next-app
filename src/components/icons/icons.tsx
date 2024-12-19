import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconsProps } from '@/components/interfaces/interfaces';

library.add(fas, far, fab);

export default function Icons({
    icon,
    className = '',
    ...props
}: IconsProps) {
    return <FontAwesomeIcon
        icon={icon}
        className={className}
        aria-hidden={!props.title}
        {...props}
    />;
};