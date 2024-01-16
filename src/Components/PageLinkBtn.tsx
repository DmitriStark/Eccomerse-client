import React from "react";

interface PageLinkBtnProps {
  pageNum: number;
  onPageBtnClick: (num: number) => void;
  isSelected: boolean;
}

export default function PageLinkBtn({
  pageNum,
  onPageBtnClick,
  isSelected,
}: PageLinkBtnProps) {
  const buttonStyle: React.CSSProperties = { backgroundColor: isSelected ? 'red' : '' };

  return (
    <button style={buttonStyle} onClick={() => onPageBtnClick(pageNum)}>
      {pageNum}
    </button>
  );
}
