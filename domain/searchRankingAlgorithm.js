// @ts-check

/**
 * @public
 * @param {Object} data
 * @return {Object[]} sitters with
 */
export function searchRankingAlgorithm (data) {
  /** @type {Object[]} */
  const dataValues = Object.values(data)
  /** @type {{}} */
  const { sitters, owners, reviews } = agreggateDataBySittersReviewsAndOwners(dataValues)
  /** @type {Object[]} */
  const scores = calculateScores({ sitters, owners, reviews })
  /** @type {Object[]} */
  const sortedScores = sortScores(scores)

  return sortedScores
}

/**
 * @private
 * @param {Object[]} data
 * @returns {{sitters, owners, reviews}}
 */
function agreggateDataBySittersReviewsAndOwners (data) {
  /** @type {Object[]}  */
  const sitters = []
  /** @type {Object[]}  */
  const owners = []
  /** @type {Object[]}  */
  const reviews = []
  /** @type {number}  */
  let reviewId = 0

  data.forEach(element => {
    /** @type {{image:string, name:string, phoneNumber:string, email:string, reviewsIds: Number[]}} */
    const sitter = { image: element.sitter_image, name: element.sitter, phoneNumber: element.sitter_phone_number, email: element.sitter_email, reviewsIds: [] }
    /** @type {{image:string, name:string, phoneNumber:string, email:string, reviewsIds: Number[]}} */
    const owner = { image: element.owner_image, name: element.owner, phoneNumber: element.owner_phone_number, email: element.owner_email, reviewsIds: [] }
    /** @type {{id:Number, rating:Number, startDate:string, endDate:string, text:string, dogs: string, responseTimeMinutes: Number}} */
    const review = { id: reviewId, rating: parseInt(element.rating), startDate: element.start_date, endDate: element.end_date, text: element.text, dogs: element.dogs, responseTimeMinutes: parseInt(element.response_time_minutes) }

    if (typeof sitters[sitter.email] === 'undefined') sitters[sitter.email] = sitter
    if (typeof owners[owner.email] === 'undefined') owners[owner.email] = owner

    reviews.push(review)
    sitters[sitter.email].reviewsIds.push(reviewId)
    owners[owner.email].reviewsIds.push(reviewId)

    reviewId++
  })

  return { sitters, reviews, owners }
}

/**
 * @private
 * @param {{sitters, owners, reviews}} params
 * @returns {Object[]} array of scores
 */
function calculateScores ({ sitters, owners, reviews }) {
  /** @type {Object[]} */
  const scores = []

  for (const sitterEmail in sitters) {
    /** @type {{image:string, name:string, phoneNumber:string, email:string, reviewsIds: Number[]}} */
    const sitter = sitters[sitterEmail]
    /** @type {Number} */
    let sumScores = 0

    sitter.reviewsIds.forEach(reviewId => {
      /** @type {{id:Number, rating:Number, startDate:string, endDate:string, text:string, dogs: string, responseTimeMinutes: Number}} */
      const review = reviews[reviewId]
      sumScores += review.rating
    })

    /** @type {string} */
    const profileScore = calculateProfileScore(sitter.name)
    /** @type {string} */
    const ratingsScore = calculateRatingsScore(sumScores, sitter.reviewsIds.length)
    /** @type {string} */
    const searchScore = calculateSearchScore(profileScore, ratingsScore, sitter.reviewsIds.length)

    scores.push({
      email: sitter.email,
      name: sitter.name,
      profile_score: profileScore,
      ratings_score: ratingsScore,
      search_score: searchScore
    })
  }

  return scores
}

/**
 * @param {string} sitterName
 * @returns {string} profile score
 */
function calculateProfileScore (sitterName) {
  /** @type {string} */
  const cleanedName = sitterName.replace(/[^a-zA-Z]/g, '').toLowerCase()
  /** @type {string[]} */
  const distinctLetters = [...new Set(cleanedName)]
  /** @type {number} */
  const fraction = distinctLetters.length / 26
  /** @type {number} */
  const profileScore = fraction * 5

  return profileScore.toFixed(2)
}

/**
 *
 * @param {string} sumScores
 * @param {Number} totalReviews
 * @returns {string} rating score
 */
function calculateRatingsScore (sumScores, totalReviews) {
  return (parseFloat(sumScores) / totalReviews).toFixed(2)
}

/**
 * @param {string} profileScore
 * @param {string} ratingsScore
 * @param {number} totalStays
 * @returns {string} search score
 */
function calculateSearchScore (profileScore, ratingsScore, totalStays) {
  if (totalStays === 0) return profileScore
  else if (totalStays >= 10) return ratingsScore
  else {
    /** @type {number} */
    const weightProfileScore = (5 - totalStays) / 5
    /** @type {number} */
    const weightRatingsScore = totalStays / 5
    /** @type {number} */
    const searchScore = (weightProfileScore * parseFloat(profileScore)) + (weightRatingsScore * parseFloat(ratingsScore))

    return searchScore.toFixed(2)
  }
}

/**
 * @param {Object[]} scores
 * @returns {Object[]} sorted scores
 */
function sortScores (scores) {
  return scores.sort((sitterA, sitterB) => {
    if (sitterB.search_score !== sitterA.search_score) return parseFloat(sitterB.search_score) - parseFloat(sitterA.search_score)
    else return sitterA.name.localeCompare(sitterB.name)
  })
}
