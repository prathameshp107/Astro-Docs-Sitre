export const dpLogic = {
  'dp': {
    title: 'Dynamic Programming (Memoization vs Tabulation)',
    input: 'Climbing Stairs N = 5',
    goal: 'Demonstrate solving complex subproblems once and storing results in a lookup table.',
    terms: {
      'Optimal Substructure': 'Optimal solution built from optimal solutions of smaller subproblems.',
      'Overlapping Subproblems': 'Subproblems reused multiple times during computation.',
      'Tabulation (Bottom-Up)': 'Filling DP table iteratively from base cases to target.',
      'Memoization (Top-Down)': 'Caching recursive call results in a hash table or array.'
    },
    array: [1, 1, 2, 3, 5, 8],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Set Base Cases — dp[0] = 1, dp[1] = 1',
        left: 0, right: 1,
        leftLabel: 'dp[0]', rightLabel: 'dp[1]',
        array: [1, 1, null, null, null, null],
        computation: 'dp[0] = 1 (ground), dp[1] = 1 (stair 1)',
        comparison: 'Base Cases Set',
        action: 'Init DP Table',
        desc: 'Initialize DP table. Set base cases: dp[0] = 1 way, dp[1] = 1 way.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Fill dp[2] = dp[1] + dp[0] = 2',
        left: 0, right: 2,
        leftLabel: 'dep 0,1', rightLabel: 'curr 2',
        array: [1, 1, 2, null, null, null],
        computation: 'dp[2] = 1 + 1 = 2',
        comparison: 'dp[2] = 2',
        action: 'Fill dp[2]',
        desc: 'Compute dp[2] = dp[1] + dp[0] = 1 + 1 = 2 distinct ways.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Fill dp[3] = 3 & dp[4] = 5',
        left: 1, right: 4,
        leftLabel: 'dep', rightLabel: 'curr 4',
        array: [1, 1, 2, 3, 5, null],
        computation: 'dp[3] = 2+1 = 3, dp[4] = 3+2 = 5',
        comparison: 'Iterative Tabulation',
        action: 'Fill dp[3], dp[4]',
        desc: 'Iteratively compute dp[3] = 3 and dp[4] = 5.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Fill dp[5] = dp[4] + dp[3] = 8 ➔ Complete 🎉',
        left: 0, right: 5,
        leftLabel: 'start', rightLabel: 'target 5',
        array: [1, 1, 2, 3, 5, 8],
        computation: 'dp[5] = 5 + 3 = 8',
        comparison: '8 DISTINCT WAYS 🎉',
        action: 'Return dp[5]',
        isMatch: true,
        desc: 'Compute dp[5] = 8. Target stair reached! Computed in O(N) linear time and O(N) space! 🎉'
      }
    ]
  },

  'climbing-stairs': {
    title: 'Climbing Stairs 1D DP Tabulation O(N)',
    input: 'N = 5 stairs',
    goal: 'Calculate total distinct ways to climb N stairs taking 1 or 2 steps at a time.',
    terms: {
      'State': 'dp[i] = distinct ways to reach stair i',
      'Transition': 'dp[i] = dp[i-1] + dp[i-2]'
    },
    array: [1, 1, 2, 3, 5, 8],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init Base Cases dp[0]=1, dp[1]=1',
        left: 0, right: 1,
        leftLabel: 'base 0', rightLabel: 'base 1',
        array: [1, 1, null, null, null, null],
        computation: 'dp[0] = 1, dp[1] = 1',
        comparison: 'Base Cases Set',
        action: 'Init dp',
        desc: 'Set base cases: dp[0] = 1, dp[1] = 1.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Calculate dp[2] = dp[1] + dp[0] = 2',
        left: 0, right: 2,
        leftLabel: 'dep 0,1', rightLabel: 'curr 2',
        array: [1, 1, 2, null, null, null],
        computation: 'dp[2] = 1 + 1 = 2',
        comparison: '2 ways to reach stair 2',
        action: 'Compute dp[2]',
        desc: 'dp[2] = dp[1] + dp[0] = 2.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Calculate dp[3] = 3, dp[4] = 5',
        left: 1, right: 4,
        leftLabel: 'dep', rightLabel: 'curr 4',
        array: [1, 1, 2, 3, 5, null],
        computation: 'dp[3]=3, dp[4]=5',
        comparison: 'Tabulate Table',
        action: 'Compute dp[3], dp[4]',
        desc: 'dp[3] = 2 + 1 = 3. dp[4] = 3 + 2 = 5.'
      },
      {
        stepNum: 4,
        title: 'Step 4: Calculate dp[5] = dp[4] + dp[3] = 8 🎉',
        left: 0, right: 5,
        leftLabel: 'start', rightLabel: 'target 5',
        array: [1, 1, 2, 3, 5, 8],
        computation: 'dp[5] = 5 + 3 = 8',
        comparison: 'DP RESULT = 8 🎉',
        action: 'Return dp[5]',
        isMatch: true,
        desc: 'dp[5] = 8. Total distinct ways to climb 5 stairs is 8! 🎉'
      }
    ]
  },

  'coin-change': {
    title: 'Coin Change Minimum Coins DP O(Amount * Coins)',
    input: 'Coins = [1, 2, 5], Amount = 11',
    goal: 'Find fewest number of coins needed to make up target amount 11.',
    terms: {
      'State': 'dp[i] = minimum coins needed for amount i',
      'Transition': 'dp[i] = min(dp[i], dp[i - coin] + 1)'
    },
    array: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    steps: [
      {
        stepNum: 1,
        title: 'Step 1: Init dp[0] = 0, dp[1..11] = ∞',
        left: 0, right: 0,
        leftLabel: 'dp[0]=0', rightLabel: 'dp[0]=0',
        array: [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        computation: 'dp[0] = 0, all others = ∞',
        comparison: '0 coins for amount 0',
        action: 'Init DP Table',
        desc: '0 coins needed for amount 0. Initialize dp[1..11] with infinity.'
      },
      {
        stepNum: 2,
        title: 'Step 2: Process Amount 5 using Coin 5 ➔ dp[5] = 1',
        left: 0, right: 5,
        leftLabel: 'dp[0]', rightLabel: 'dp[5]',
        array: [0, 1, 1, 2, 2, 1, 11, 11, 11, 11, 11, 11],
        computation: 'dp[5] = min(∞, dp[0] + 1) = 1',
        comparison: '1 coin of 5',
        action: 'Update dp[5]',
        desc: 'Using coin 5: dp[5] = dp[0] + 1 = 1 coin.'
      },
      {
        stepNum: 3,
        title: 'Step 3: Process Amount 11 ➔ dp[11] = dp[6] + 1 = 3 (5+5+1) 🎉',
        left: 0, right: 11,
        leftLabel: 'amount 0', rightLabel: 'amount 11',
        array: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
        computation: 'dp[11] = min(∞, dp[6] + 1) = 2 + 1 = 3',
        comparison: 'MIN COINS = 3 🎉',
        action: 'Return dp[11]',
        isMatch: true,
        desc: 'dp[11] = 3 (coins 5 + 5 + 1). Minimum coins needed is 3! 🎉'
      }
    ]
  }
};
