

const insertScores = async (client, report_id) => {
  console.log('Server:', report_id);
  try {
    const query = `
      INSERT INTO scores (report_id, checkformtype, category, title, have_pm_pf, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      ON CONFLICT (report_id, title)
      DO UPDATE SET
        checkformtype = EXCLUDED.checkformtype,
        category = EXCLUDED.category,
        have_pm_pf = EXCLUDED.have_pm_pf,
        updated_at = NOW()
      WHERE scores.checkformtype <> EXCLUDED.checkformtype
        OR scores.category <> EXCLUDED.category
        OR scores.have_pm_pf <> EXCLUDED.have_pm_pf;
    `;

    for (const key in scores) {
      if (scores.hasOwnProperty(key)) {
        const score = scores[key];
        await client.query(query, [
          report_id,
          score.checkFormType,
          score.category,
          score.title,
          score.have_pm_pf
        ]);
      }
    }

    return { success: true, message: "Records inserted/updated successfully" };
  } catch (error) {
    console.error('Error inserting/updating records:', error);
    return { success: false, message: "Error inserting/updating records" };
  }
};

const scores = {
  1: {
    checkFormType: 1,
    category: 1,
    title: 'NORMAL/NON-NORMAL OPERATIONS',
    have_pm_pf: false,
  },
  2: {
    checkFormType: 1,
    category: 1,
    title: 'PERFORMANCE CALCULATIONS',
    have_pm_pf: false,
  },
  3: {
    checkFormType: 1,
    category: 2,
    title: 'FLIGHT PREPARATION',
    have_pm_pf: false,
  },
  4: {
    checkFormType: 1,
    category: 2,
    title: 'PRE-FLIGHT CHECKS / FMS PROGRAMMING',
    have_pm_pf: false,
  },
  5: {
    checkFormType: 1,
    category: 2,
    title: 'ENGINE START / AFTER START',
    have_pm_pf: false,
  },
  6: {
    checkFormType: 1,
    category: 2,
    title: 'TAXI',
    have_pm_pf: false,
  },
  7: {
    checkFormType: 1,
    category: 2,
    title: 'TAKEOFF',
    have_pm_pf: false,
  },
  8: {
    checkFormType: 1,
    category: 2,
    title: 'DEPARTURE',
    have_pm_pf: false,
  },
  9: {
    checkFormType: 1,
    category: 2,
    title: 'CRUISE / EN ROUTE NAVIGATION',
    have_pm_pf: false,
  },
  10: {
    checkFormType: 1,
    category: 2,
    title: 'DESCENT PLANNING / FMS PROGRAMMING',
    have_pm_pf: false,
  },
  11: {
    checkFormType: 1,
    category: 2,
    title: 'DESCENT & ARRIVAL',
    have_pm_pf: false,
  },
  12: {
    checkFormType: 1,
    category: 2,
    title: 'HOLDING',
    have_pm_pf: false,
  },
  13: {
    checkFormType: 1,
    category: 2,
    title: 'PRECISION APPROACH',
    have_pm_pf: false,
  },
  14: {
    checkFormType: 1,
    category: 2,
    title: 'NON-PRECISION APPROACH',
    have_pm_pf: false,
  },
  15: {
    checkFormType: 1,
    category: 2,
    title: 'VISUAL CIRCUIT / CIRCLING APPROACH',
    have_pm_pf: false,
  },
  16: {
    checkFormType: 1,
    category: 2,
    title: 'REJECTED LANDING / GO AROUND',
    have_pm_pf: false,
  },
  17: {
    checkFormType: 1,
    category: 2,
    title: 'LANDING (ALL CONFIGURATIONS) / DECELERATION',
    have_pm_pf: false,
  },
  18: {
    checkFormType: 1,
    category: 2,
    title: 'AFTER LANDING / PARKING',
    have_pm_pf: false,
  },
  19: {
    checkFormType: 1,
    category: 2,
    title: 'SECURING AIRCRAFT / POST FLIGHT',
    have_pm_pf: false,
  },
  20: {
    checkFormType: 1,
    category: 2,
    title: 'LINE OPERATIONS PM DUTIES',
    have_pm_pf: false,
  },
  21: {
    checkFormType: 1,
    category: 3,
    title: 'AREA/ROUTE/AIRPORT KNOWLEDGE',
    have_pm_pf: false,
  },
  22: {
    checkFormType: 1,
    category: 4,
    title: 'AIR COND / PRESS / VENT',
    have_pm_pf: false,
  },
  23: {
    checkFormType: 1,
    category: 4,
    title: 'AUTO FLT',
    have_pm_pf: false,
  },
  24: {
    checkFormType: 1,
    category: 4,
    title: 'COMMUNICATION',
    have_pm_pf: false,
  },
  25: {
    checkFormType: 1,
    category: 4,
    title: 'ELECTRICAL',
    have_pm_pf: false,
  },
  26: {
    checkFormType: 1,
    category: 4,
    title: 'FIRE PROTECTION / SMOKE CONTROL & REMOVAL',
    have_pm_pf: false,
  },
  27: {
    checkFormType: 1,
    category: 4,
    title: 'FLIGHT CONTROLS',
    have_pm_pf: false,
  },
  28: {
    checkFormType: 1,
    category: 4,
    title: 'FUEL',
    have_pm_pf: false,
  },
  29: {
    checkFormType: 1,
    category: 4,
    title: 'HYDRAULICS',
    have_pm_pf: false,
  },
  30: {
    checkFormType: 1,
    category: 4,
    title: 'ICE AND RAIN PROTECTION',
    have_pm_pf: false,
  },
  31: {
    checkFormType: 1,
    category: 4,
    title: 'INDICATING AND RECORDING / ECAM / EFIS',
    have_pm_pf: false,
  },
  32: {
    checkFormType: 1,
    category: 4,
    title: 'LANDING GEAR',
    have_pm_pf: false,
  },
  33: {
    checkFormType: 1,
    category: 4,
    title: 'NAVIGATION',
    have_pm_pf: false,
  },
  34: {
    checkFormType: 1,
    category: 4,
    title: 'AUXILIARY POWER UNIT',
    have_pm_pf: false,
  },
  35: {
    checkFormType: 1,
    category: 4,
    title: 'POWERPLANT',
    have_pm_pf: false,
  },
  36: {
    checkFormType: 1,
    category: 4,
    title: 'OTHER SYSTEMS (specify)',
    have_pm_pf: false,
  },
  37: {
    checkFormType: 1,
    category: 5,
    title: 'FIRE DRILLS INCLUDING EVACUATION',
    have_pm_pf: true,
  },
  38: {
    checkFormType: 1,
    category: 5,
    title: 'GPWS/EGPWS',
    have_pm_pf: true,
  },
  39: {
    checkFormType: 1,
    category: 5,
    title: 'WINDSHEAR',
    have_pm_pf: true,
  },
  40: {
    checkFormType: 1,
    category: 5,
    title: 'EMERGENCY DESCENT',
    have_pm_pf: true,
  },
  41: {
    checkFormType: 1,
    category: 5,
    title: 'INCAPACITATION',
    have_pm_pf: true,
  },
  42: {
    checkFormType: 1,
    category: 5,
    title: 'ACAS EVENT',
    have_pm_pf: true,
  },
  43: {
    checkFormType: 1,
    category: 5,
    title: 'STALL RECOGNITION AND RECOVERY',
    have_pm_pf: true,
  },
  44: {
    checkFormType: 1,
    category: 5,
    title: 'OTHER MANEUVERS (specify)',
    have_pm_pf: true,
  },
  45: {
    checkFormType: 1,
    category: 6,
    title: 'TAKEOFF: ENGINE FAILURE',
    have_pm_pf: true,
  },
  46: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 V2 CLIMB',
    have_pm_pf: true,
  },
  47: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 CLEAN-UP / ENGINE-OUT DEPARTURE',
    have_pm_pf: true,
  },
  48: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 PROCEDURE / RELIGHT PROCEDURE',
    have_pm_pf: true,
  },
  49: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 APPROACH PREPARATION',
    have_pm_pf: true,
  },
  50: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 PRECISION APPROACH',
    have_pm_pf: true,
  },
  51: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 NON-PRECISION',
    have_pm_pf: true,
  },
  52: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 VISUAL APPROACH',
    have_pm_pf: true,
  },
  53: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 GO AROUND',
    have_pm_pf: true,
  },
  54: {
    checkFormType: 1,
    category: 6,
    title: 'N-1 LANDING / DECELERATION',
    have_pm_pf: true,
  },
  55: {
    checkFormType: 1,
    category: 6,
    title: 'REJECTED TAKEOFF',
    have_pm_pf: true,
  },
  56: {
    checkFormType: 1,
    category: 6,
    title: 'PILOT & INSTRUMENT PM DUTIES',
    have_pm_pf: true,
  },
  57: {
    checkFormType: 1,
    category: 7,
    title: 'LVO PRE-FLIGHT CHECKS',
    have_pm_pf: true,
  },
  58: {
    checkFormType: 1,
    category: 7,
    title: 'LVO TAXI',
    have_pm_pf: true,
  },
  59: {
    checkFormType: 1,
    category: 7,
    title: 'LVO TAKEOFF',
    have_pm_pf: true,
  },
  60: {
    checkFormType: 1,
    category: 7,
    title: 'LVO APPROACH PREPARATION',
    have_pm_pf: true,
  },
  61: {
    checkFormType: 1,
    category: 7,
    title: 'LVO CAT ___ APPROACH',
    have_pm_pf: true,
  },
  62: {
    checkFormType: 1,
    category: 7,
    title: 'LVO REJECTED LANDING / GO AROUND',
    have_pm_pf: true,
  },
  63: {
    checkFormType: 1,
    category: 7,
    title: 'LVO LANDING / DECELERATION',
    have_pm_pf: true,
  },
  64: {
    checkFormType: 1,
    category: 7,
    title: 'LVO TAKEOFF: REJECTED TAKEOFF',
    have_pm_pf: true,
  },
  65: {
    checkFormType: 1,
    category: 7,
    title: 'FAILURES ASSOCIATED WITH LVO',
    have_pm_pf: true,
  },
  66: {
    checkFormType: 1,
    category: 8,
    title: 'CRM/TEM SKILLS',
    have_pm_pf: false,
  },
  67: {
    checkFormType: 1,
    category: 8,
    title: 'SOP COMPLIANCE',
    have_pm_pf: false,
  },
  68: {
    checkFormType: 1,
    category: 8,
    title: 'USE OF CHECKLISTS (NORMAL/ABNORMAL)',
    have_pm_pf: false,
  },
  69: {
    checkFormType: 1,
    category: 8,
    title: 'USE OF COMMUNICATIONS (INTERNAL/EXTERNAL)',
    have_pm_pf: false,
  },
  70: {
    checkFormType: 1,
    category: 8,
    title: 'SAFETY / EFFICIENCY / ECONOMY',
    have_pm_pf: false,
  },
  71: {
    checkFormType: 1,
    category: 9,
    title: 'ELECTRONIC FLIGHT BAG',
    have_pm_pf: false,
  },
};



export default { insertScores };
