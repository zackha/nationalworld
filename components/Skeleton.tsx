import ContentLoader, { Rect } from 'react-content-loader/native';
import { screenWidth } from '@/utils/dimensions';

export const SkeletonLoadingNews = () => (
  <ContentLoader speed={1} width={'100%'} backgroundColor="#161616" foregroundColor="#222">
    <Rect x="0" y="0" width="100%" height="215" />
    <Rect x="14" y="236" rx="4" ry="4" width={screenWidth - 100} height="20" />
    <Rect x="14" y="268" rx="4" ry="4" width={screenWidth - 140} height="20" />
    <Rect x="14" y="306" rx="4" ry="4" width={screenWidth - 40} height="12" />
    <Rect x="14" y="324" rx="4" ry="4" width={screenWidth - 80} height="12" />
    <Rect x="14" y="359" rx="4" ry="4" width={'64'} height="12" />
    <Rect x="90" y="359" rx="4" ry="4" width={'70'} height="12" />
    <Rect x="14" y="383" rx="0" ry="0" width={screenWidth - 28} height="1" />
    <Rect x="14" y="398" rx="8" ry="8" width={screenWidth * 0.325} height="80" />
    <Rect x={screenWidth * 0.385} y="402" rx="4" ry="4" width={screenWidth - 200} height="16" />
    <Rect x={screenWidth * 0.385} y="428" rx="4" ry="4" width={screenWidth - 230} height="16" />
    <Rect x={screenWidth * 0.385} y="464" rx="4" ry="4" width={64} height="12" />
    <Rect x={screenWidth * 0.58} y="464" rx="4" ry="4" width={70} height="12" />
    <Rect x="14" y="493" rx="0" ry="0" width={screenWidth - 28} height="1" />

    <Rect x="14" y="508" rx="8" ry="8" width={screenWidth * 0.325} height="80" />
    <Rect x={screenWidth * 0.385} y="512" rx="4" ry="4" width={screenWidth - 200} height="16" />
    <Rect x={screenWidth * 0.385} y="538" rx="4" ry="4" width={screenWidth - 230} height="16" />
    <Rect x={screenWidth * 0.385} y="574" rx="4" ry="4" width={64} height="12" />
    <Rect x={screenWidth * 0.58} y="574" rx="4" ry="4" width={70} height="12" />
    <Rect x="14" y="603" rx="0" ry="0" width={screenWidth - 28} height="1" />

    <Rect x="14" y="618" rx="8" ry="8" width={screenWidth * 0.325} height="80" />
    <Rect x={screenWidth * 0.385} y="622" rx="4" ry="4" width={screenWidth - 200} height="16" />
    <Rect x={screenWidth * 0.385} y="648" rx="4" ry="4" width={screenWidth - 230} height="16" />
    <Rect x={screenWidth * 0.385} y="684" rx="4" ry="4" width={64} height="12" />
    <Rect x={screenWidth * 0.58} y="684" rx="4" ry="4" width={70} height="12" />
    <Rect x="14" y="713" rx="0" ry="0" width={screenWidth - 28} height="1" />
  </ContentLoader>
);

export const SkeletonHasMoreNews = () => (
  <ContentLoader speed={1} width={'100%'} backgroundColor="#161616" foregroundColor="#222">
    <Rect x={screenWidth * 0.5} y="14" width={screenWidth * 0.5 - 14} height="110" />
    <Rect x="14" y="18" rx="4" ry="4" width={screenWidth * 0.5 - 35} height="16" />
    <Rect x="14" y="42" rx="4" ry="4" width={screenWidth * 0.5 - 65} height="16" />
    <Rect x="14" y="68" rx="4" ry="4" width={screenWidth * 0.5 - 30} height="16" />
    <Rect x="14" y="92" rx="4" ry="4" width={screenWidth * 0.5 - 90} height="16" />
    <Rect x="14" y="136" rx="4" ry="4" width={screenWidth - 50} height="12" />
    <Rect x="14" y="156" rx="4" ry="4" width={screenWidth - 28} height="12" />
    <Rect x="14" y="176" rx="4" ry="4" width="70" height="12" />
    <Rect x="14" y="206" rx="4" ry="4" width="64" height="12" />
    <Rect x="90" y="206" rx="4" ry="4" width="70" height="12" />
    <Rect x="14" y="235" rx="0" ry="0" width={screenWidth - 28} height="1" />

    <Rect x={screenWidth * 0.5} y="248" width={screenWidth * 0.5 - 14} height="110" />
    <Rect x="14" y="252" rx="4" ry="4" width={screenWidth * 0.5 - 35} height="16" />
    <Rect x="14" y="276" rx="4" ry="4" width={screenWidth * 0.5 - 65} height="16" />
    <Rect x="14" y="302" rx="4" ry="4" width={screenWidth * 0.5 - 30} height="16" />
    <Rect x="14" y="326" rx="4" ry="4" width={screenWidth * 0.5 - 90} height="16" />
    <Rect x="14" y="370" rx="4" ry="4" width={screenWidth - 50} height="12" />
    <Rect x="14" y="390" rx="4" ry="4" width={screenWidth - 28} height="12" />
    <Rect x="14" y="410" rx="4" ry="4" width="70" height="12" />
    <Rect x="14" y="440" rx="4" ry="4" width="64" height="12" />
    <Rect x="90" y="440" rx="4" ry="4" width="70" height="12" />
    <Rect x="14" y="469" rx="0" ry="0" width={screenWidth - 28} height="1" />

    <Rect x={screenWidth * 0.5} y="482" width={screenWidth * 0.5 - 14} height="110" />
    <Rect x="14" y="486" rx="4" ry="4" width={screenWidth * 0.5 - 35} height="16" />
    <Rect x="14" y="510" rx="4" ry="4" width={screenWidth * 0.5 - 65} height="16" />
    <Rect x="14" y="536" rx="4" ry="4" width={screenWidth * 0.5 - 30} height="16" />
    <Rect x="14" y="560" rx="4" ry="4" width={screenWidth * 0.5 - 90} height="16" />
    <Rect x="14" y="604" rx="4" ry="4" width={screenWidth - 50} height="12" />
    <Rect x="14" y="624" rx="4" ry="4" width={screenWidth - 28} height="12" />
    <Rect x="14" y="644" rx="4" ry="4" width="70" height="12" />
    <Rect x="14" y="674" rx="4" ry="4" width="64" height="12" />
    <Rect x="90" y="674" rx="4" ry="4" width="70" height="12" />
  </ContentLoader>
);
