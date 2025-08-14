import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
type MenuButtonProps = {
	to: string;
	selected: boolean;
	label: string;
	rounded?: string;
	navigate: (to: string) => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ to, selected, label, rounded, navigate }) => {
		return (
				<button
					className={`w-full text-left px-4 py-2 text-text ${rounded || ''} ${selected ? 'font-bold' : 'font-semibold'}`}
					style={{
						textDecoration: selected ? undefined : undefined
					}}
					onClick={() => navigate(to)}
					onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
					onMouseLeave={e => e.currentTarget.style.textDecoration = ''}
				>
					{label}
				</button>
		);
};



const HamburgerMenu: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);
	const [scheduleType, setScheduleType] = useState<'US' | 'MS'>(() => {
		const saved = localStorage.getItem('scheduleType');
		return saved === 'MS' ? 'MS' : 'US';
	});

	useEffect(() => {
		localStorage.setItem('scheduleType', scheduleType);
		// Optionally trigger a custom event for app-wide update
		window.dispatchEvent(new CustomEvent('scheduleTypeChanged', { detail: scheduleType }));
	}, [scheduleType]);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.matchMedia('(pointer: coarse)').matches || /Mobi|Android/i.test(navigator.userAgent));
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	const hamburgerBtnBase = "flex flex-col justify-center items-center w-10 h-10 rounded-lg border-2 border-accent bg-background shadow-sm transition-colors duration-150";
	const hamburgerBtnHover = "hover:bg-accent";
	const hamburgerBtnActiveMobile = isMobile && open ? "bg-accent" : "";

	return (
		<div className="relative ml-2" ref={menuRef}>
			<button
				className={`${hamburgerBtnBase} ${isMobile ? hamburgerBtnActiveMobile : hamburgerBtnHover}`}
				aria-label="Menu"
				onClick={() => setOpen((prev) => !prev)}
			>
				<span className="block w-6 h-1 bg-accent mb-1 rounded transition-all"></span>
				<span className="block w-6 h-1 bg-accent mb-1 rounded transition-all"></span>
				<span className="block w-6 h-1 bg-accent rounded transition-all"></span>
			</button>
			{open && (
				<div className="absolute right-0 mt-2 w-44 bg-background border border-accent rounded shadow-lg z-50">
					<div className="flex flex-row gap-2 px-2 pt-2 pb-2">
						<button
							className={`flex-1 px-0 py-2 rounded-lg border-2 text-base font-bold transition-colors duration-150 mx-0 ${scheduleType === 'US' ? 'bg-primary text-background border-primary font-bold' : 'bg-background text-primary border-primary'}`}
							style={{marginLeft: 0, marginRight: 0}}
							onClick={() => setScheduleType('US')}
						>
							US
						</button>
						<button
							className={`flex-1 px-0 py-2 rounded-lg border-2 text-base font-bold transition-colors duration-150 mx-0 ${scheduleType === 'MS' ? 'bg-primary text-background border-primary font-bold' : 'bg-background text-primary border-primary'}`}
							style={{marginLeft: 0, marginRight: 0}}
							onClick={() => setScheduleType('MS')}
						>
							MS
						</button>
					</div>
					<div className="pt-2">
						<MenuButton
							to="/"
							selected={location.pathname === '/'}
							label="Home"
							rounded="rounded-t"
							navigate={navigate}
						/>
						<MenuButton
							to="/settings"
							selected={location.pathname === '/settings'}
							label="Settings"
							navigate={navigate}
						/>
						<MenuButton
							to="/info"
							selected={location.pathname === '/info'}
							label="Info"
							rounded="rounded-b"
							navigate={navigate}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default HamburgerMenu;
