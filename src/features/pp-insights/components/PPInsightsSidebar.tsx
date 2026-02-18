import type { ComponentType } from 'react';
import styled from 'styled-components';
import type { DashboardViewId, NavItem } from '../types';
import {
  BadgeIndianRupee,
  CircleUserRound,
  LayoutDashboard,
  Radar,
  ShieldCheck,
  ShieldEllipsis,
  Target,
  WalletCards,
} from 'lucide-react';

interface PPInsightsSidebarProps {
  navItems: NavItem[];
  activeView: DashboardViewId;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onViewChange: (viewId: DashboardViewId) => void;
}

const NAV_ICONS: Record<DashboardViewId, ComponentType<{ className?: string }>> = {
  cockpit: LayoutDashboard,
  acquisition: Target,
  portfolio: WalletCards,
  collections: BadgeIndianRupee,
  risk: ShieldCheck,
  finance: ShieldEllipsis,
  customer360: CircleUserRound,
  watchtower: Radar,
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
  gap: 6px;
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
  return (
    <Sidebar>
      <Brand>
        <BrandTitle>PP Insights</BrandTitle>
        <BrandSub>Lending Command Center</BrandSub>
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
            const Icon = NAV_ICONS[item.id];
            return (
              <NavBtn key={item.id} onClick={() => onViewChange(item.id)} $active={activeView === item.id}>
                <Icon className="h-4 w-4 shrink-0" />
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
