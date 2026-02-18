import { useState, type ComponentType } from 'react';
import styled from 'styled-components';
import type { DashboardViewId, NavItem } from '../types';
import {
  BadgeIndianRupee,
  BarChart3,
  CalendarClock,
  ChevronDown,
  CircleUserRound,
  Globe,
  LayoutDashboard,
  MapPin,
  PieChart,
  Radar,
  ShieldCheck,
  ShieldEllipsis,
  Target,
  Users,
  WalletCards,
} from 'lucide-react';

interface PPInsightsSidebarProps {
  navItems: NavItem[];
  activeView: DashboardViewId;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onViewChange: (viewId: DashboardViewId) => void;
}

const NAV_ICONS: Partial<Record<DashboardViewId, ComponentType<{ className?: string }>>> = {
  cockpit: LayoutDashboard,
  acquisition: Target,
  portfolio: WalletCards,
  collections: BadgeIndianRupee,
  risk: ShieldCheck,
  finance: ShieldEllipsis,
  dpdRecon: CalendarClock,
  customer360: CircleUserRound,
  watchtower: Radar,
  portfolioAccountStatus: PieChart,
  portfolioLimitSpread: BarChart3,
  portfolioVintage: CalendarClock,
  portfolioGeo: MapPin,
  portfolioDemographics: Users,
};

const GROUP_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  'Finance & Recon': ShieldEllipsis,
  'Portfolio Analytics': Globe,
};

const Sidebar = styled.aside`
  display: flex;
  width: 280px;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.glass.border};
  background: ${({ theme }) => theme.glass.surface};
  backdrop-filter: blur(${({ theme }) => theme.glass.blur});
  box-shadow: ${({ theme }) => theme.glass.shadow};
`;

const Brand = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.glass.borderLight};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BrandTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.info} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BrandSub = styled.div`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.glass.textMuted};
`;

const SearchWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.glass.borderLight};
  padding: ${({ theme }) => theme.spacing.md};
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.glass.backgroundSecondary};
  color: ${({ theme }) => theme.glass.text};
  padding: 10px 12px;

  &::placeholder {
    color: ${({ theme }) => theme.glass.textMuted};
  }
`;

const Nav = styled.nav`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const NavList = styled.div`
  display: grid;
  gap: 4px;
`;

const NavBtn = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 10px 12px;
  border: 1px solid ${({ theme, $active }) => ($active ? `${theme.colors.primary}55` : 'transparent')};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}18` : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.glass.textSecondary)};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.glass.surfaceHover};
    color: ${({ theme }) => theme.glass.text};
  }
`;

const NavLabel = styled.span`
  flex: 1;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const GroupHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.glass.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.glass.surfaceHover};
    color: ${({ theme }) => theme.glass.text};
  }
`;

const SubList = styled.div`
  padding-left: 20px;
  display: grid;
  gap: 2px;
`;

const SubBtn = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 8px 12px;
  border: 1px solid ${({ theme, $active }) => ($active ? `${theme.colors.primary}55` : 'transparent')};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}18` : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.glass.textSecondary)};
  font-size: 13px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.glass.surfaceHover};
    color: ${({ theme }) => theme.glass.text};
  }
`;

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.glass.borderLight};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.glass.textMuted};
`;

const PPInsightsSidebar = ({
  navItems,
  activeView,
  searchQuery,
  onSearchChange,
  onViewChange,
}: PPInsightsSidebarProps) => {
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    navItems.forEach((item) => {
      if (item.children?.some((c) => c.id === activeView)) {
        initial.add(item.label);
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <Sidebar>
      <Brand>
        <BrandTitle>PP Insights</BrandTitle>
        <BrandSub>Global Lending Command Center</BrandSub>
      </Brand>

      <SearchWrap>
        <SearchInput
          type="text"
          placeholder="Search Mobile/LAN..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchWrap>

      <Nav>
        <NavList>
          {navItems.map((item) => {
            if (item.children) {
              const isOpen = openGroups.has(item.label);
              const isGroupActive = item.children.some((c) => c.id === activeView);
              const GIcon = GROUP_ICONS[item.label] || NAV_ICONS[item.id];

              return (
                <div key={item.label}>
                  <GroupHeader $open={isOpen} onClick={() => toggleGroup(item.label)}>
                    {GIcon && <GIcon className="h-4 w-4 shrink-0" />}
                    <NavLabel style={{ fontWeight: isGroupActive ? 600 : undefined }}>{item.label}</NavLabel>
                    <ChevronDown
                      className="h-3.5 w-3.5 shrink-0 transition-transform"
                      style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
                    />
                  </GroupHeader>
                  {isOpen && (
                    <SubList>
                      {item.children.map((child) => {
                        const CIcon = NAV_ICONS[child.id];
                        return (
                          <SubBtn key={child.id} $active={activeView === child.id} onClick={() => onViewChange(child.id)}>
                            {CIcon && <CIcon className="h-3.5 w-3.5 shrink-0" />}
                            <NavLabel>{child.label}</NavLabel>
                          </SubBtn>
                        );
                      })}
                    </SubList>
                  )}
                </div>
              );
            }

            const Icon = NAV_ICONS[item.id];
            return (
              <NavBtn key={item.id} onClick={() => onViewChange(item.id)} $active={activeView === item.id}>
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <NavLabel>{item.label}</NavLabel>
              </NavBtn>
            );
          })}
        </NavList>
      </Nav>

      <Footer>
        <div>
          Logged in as: <strong>Director</strong>
        </div>
        <div style={{ marginTop: 4 }}>v2.5.0 | SSOT Dashboard</div>
      </Footer>
    </Sidebar>
  );
};

export default PPInsightsSidebar;
