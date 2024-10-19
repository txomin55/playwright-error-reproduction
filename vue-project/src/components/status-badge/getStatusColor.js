export const STATUS = {
  PENDING: "PENDING",
  FOR_REVIEW: "FOR_REVIEW",
  VALIDATED: "VALIDATED",
  FLAGGED: "FLAGGED",
}

export const STATUS_COLOR = {
  [STATUS.PENDING]: {
    bgColor: "#A0AABA",
    fontColor: "#ffffff"
  },
  [STATUS.FOR_REVIEW]: {
    bgColor: "#F3A133",
    fontColor: "#ffffff"
  },
  [STATUS.VALIDATED]: {
    bgColor: "#4DA89A",
    fontColor: "#ffffff"
  },
  [STATUS.FLAGGED]: {
    bgColor: "#EF7684",
    fontColor: "#ffffff"
  },
}

export const getStatusColor = (status) => {
  const upperCaseStatus = status?.toUpperCase()
  return STATUS_COLOR[upperCaseStatus] ?? STATUS_COLOR[STATUS.PENDING]
}
