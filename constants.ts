
import { WorkoutGoal, DayPlan, NutritionSection, FastingSection, BilingualText } from './types';

export const WORKOUT_DATA = {
  goals: [
    {
      id: 'bulking',
      title: { en: 'Bulking', ar: 'التضخيم العضلي' },
      desc: { 
        en: 'Progressive overload with 48h rest between muscle groups. Caloric surplus +300-500kcal.',
        ar: 'زيادة الحمل التدريجي مع راحة 48 ساعة بين مجموعات العضلات. فائض سعرات حرارية +300-500 سعرة.'
      },
      plan: {
        en: '4-day split: Chest/Triceps, Back/Biceps, Legs, Shoulders/Traps',
        ar: 'برنامج 4 أيام: صدر/ثلاثية الرؤوس، ظهر/ثنائية الرؤوس، أرجل، كتفين/ترابيس'
      },
      exercises: [
        { name: { en: 'Bench Press', ar: 'الضغط المسطح' }, sets: 4, reps: '8-10', rest: 120 },
        { name: { en: 'Squats', ar: 'القرفصاء' }, sets: 4, reps: '8-10', rest: 150 },
        { name: { en: 'Pull-ups', ar: 'الشد لأعلى' }, sets: 3, reps: 'Max', rest: 120 },
        { name: { en: 'Deadlifts', ar: 'الرفعة المميتة' }, sets: 3, reps: '6-8', rest: 180 }
      ]
    },
    {
      id: 'cutting',
      title: { en: 'Cutting', ar: 'التجفيف' },
      desc: { 
        en: 'High protein intake (2.2g/kg), moderate deficit. Focus on compound movements.',
        ar: 'تناول بروتين عالي (2.2غ/كلغ وزن)، عجز معتدل. التركيز على التمارين المركبة.'
      },
      plan: {
        en: '5-day split with cardio sessions. Protein focus: 40% calories',
        ar: 'برنامج 5 أيام مع جلسات كارديو. التركيز على البروتين: 40% من السعرات'
      },
      exercises: [
        { name: { en: 'Incline Dumbbell Press', ar: 'الضغط بالدمبلز على مقعد مائل' }, sets: 3, reps: '12-15', rest: 60 },
        { name: { en: 'Romanian Deadlifts', ar: 'الرفعة الرومانية' }, sets: 3, reps: '15', rest: 60 },
        { name: { en: 'Face Pulls', ar: 'شد الوجه' }, sets: 3, reps: '20', rest: 45 }
      ]
    },
    {
      id: 'queenShape',
      title: { en: 'Queen Shape', ar: 'القوام الملكي' },
      desc: { 
        en: 'Glute-focused training 2x/week. Hip thrusts, RDLs, and lateral movements.',
        ar: 'تمارين مركزة على الألوية مرتين أسبوعياً. رفع الحوض، رومانيان ديدليفت، وحركات جانبية.'
      },
      plan: {
        en: 'Glute activation daily + 2 heavy sessions weekly',
        ar: 'تنشيط الألوية يومياً + جلستين مكثفتين أسبوعياً'
      },
      exercises: [
        { name: { en: 'Hip Thrusts', ar: 'رفع الحوض' }, sets: 4, reps: '12', rest: 90 },
        { name: { en: 'Bulgarian Split Squats', ar: 'القرفصاء البلغارية' }, sets: 3, reps: '10 per leg', rest: 90 },
        { name: { en: 'Glute Bridges', ar: 'جسور الألوية' }, sets: 3, reps: '20', rest: 60 }
      ]
    },
    {
      id: 'strength',
      title: { en: 'Strength Building', ar: 'بناء القوة' },
      desc: { 
        en: 'Low reps, high weight. Focus on compound lifts with long rest periods.',
        ar: 'تكرارات منخفضة، أوزان عالية. التركيز على التمارين المركبة مع فترات راحة طويلة.'
      },
      plan: {
        en: '3-day split: Push, Pull, Legs. Heavy singles and doubles weekly.',
        ar: 'برنامج 3 أيام: دفع، سحب، أرجل.'
      },
      exercises: [
        { name: { en: 'Deadlift', ar: 'الرفعة المميتة' }, sets: 3, reps: '1-3', rest: 240 },
        { name: { en: 'Back Squat', ar: 'القرفصاء الخلفية' }, sets: 5, reps: '3-5', rest: 180 }
      ]
    }
  ] as WorkoutGoal[],

  levels: [
    {
      id: 'beginner',
      title: { en: 'Beginner', ar: 'مبتدئ' },
      desc: { en: 'Master form with light weights. Full body routines 3x/week.', ar: 'إتقان الشكل بأوزان خفيفة. روتين كامل للجسم 3 مرات أسبوعياً.' }
    },
    {
      id: 'advanced',
      title: { en: 'Advanced', ar: 'متقدم' },
      desc: { en: 'Push/pull/legs split. Periodization blocks. Advanced techniques.', ar: 'تقسيم دفع/شد/أرجل. كتل تدريبية دورية. تقنيات متقدمة.' }
    }
  ],
  
  fullWeekPlans: {
    bulking: [
      {
        day: { en: 'Monday - Chest/Triceps', ar: 'الاثنين - الصدر/ثلاثية الرؤوس' },
        exercises: [
          { 
            name: { en: 'Bench Press', ar: 'الضغط المسطح' },
            sets: 4, reps: '8-10', rest: 120,
            desc: { en: 'Focus on chest contraction at the top position', ar: 'التركيز على انقباض الصدر في الوضعية العليا' },
            warmup: { en: '2 sets of 10-12 reps at 50% working weight', ar: 'مجموعتان من 10-12 تكرار بـ50% من وزن التمرين' }
          },
          { 
            name: { en: 'Triceps Pushdown', ar: 'دفع ثلاثية الرؤوس' },
            sets: 3, reps: '12-15', rest: 60,
            desc: { en: 'Elbows pinned to sides, only forearms move', ar: 'ثني المرفقين بجانب الجسم، تحريك الساعدين فقط' },
            warmup: { en: '1 set of 15 reps with light weight', ar: 'مجموعة واحدة 15 تكرار بوزن خفيف' }
          }
        ]
      },
      {
        day: { en: 'Tuesday - Back/Biceps', ar: 'الثلاثاء - الظهر/ثنائية الرؤوس' },
        exercises: [
          { 
            name: { en: 'Pull-ups', ar: 'الشد لأعلى' },
            sets: 4, reps: 'Max', rest: 120,
            desc: { en: 'Full range of motion, chest to bar', ar: 'مدى حركة كامل، الصدر إلى الشريط' },
            warmup: { en: '2 sets of 5-8 reps with assistance if needed', ar: 'مجموعتان 5-8 تكرار بمساندة إذا لزم الأمر' }
          }
        ]
      }
    ],
    cutting: [
      {
        day: { en: 'Monday - Chest/Triceps/HIIT', ar: 'الاثنين - الصدر/ثلاثية الرؤوس/HIIT' },
        exercises: [
          { 
            name: { en: 'Incline Dumbbell Press', ar: 'الضغط بالدمبلز على مقعد مائل' },
            sets: 3, reps: '12-15', rest: 60,
            desc: { en: 'Controlled eccentric phase for maximum time under tension', ar: 'المرحلة السلبية مضبوطة لأقصى وقت تحت التوتر' },
            warmup: { en: '2 sets of 15 reps with light weight', ar: 'مجموعتان 15 تكرار بوزن خفيف' }
          }
        ]
      }
    ]
  } as Record<string, DayPlan[]>,
  
  nutrition: {
    preWorkout: [
      {
        title: { en: 'Pre-Workout Nutrition (1-2 hours before)', ar: 'التغذية قبل التمرين (1-2 ساعة قبل)' },
        items: [
          { en: 'Complex carbohydrates: oats, brown rice, sweet potatoes', ar: 'كربوهيدرات معقدة: الشوفان، الأرز البني، البطاطا الحلوة' },
          { en: 'Lean protein: chicken breast, fish, whey protein', ar: 'بروتين قليل الدهون: صدر الدجاج، السمك، بروتين مصل اللبن' },
          { en: 'Small amount of healthy fats: nuts, avocado', ar: 'كمية صغيرة من الدهون الصحية: المكسرات، الأفوكادو' }
        ]
      }
    ],
    postWorkout: [
      {
        title: { en: 'Post-Workout Nutrition (within 45 minutes)', ar: 'التغذية بعد التمرين (في غضون 45 دقيقة)' },
        items: [
          { en: 'Fast-absorbing protein: whey protein, lean chicken', ar: 'بروتين سريع الامتصاص: بروتين مصل اللبن، دجاج خالي من الدهون' },
          { en: 'High GI carbs: white rice, potatoes', ar: 'كربوهيدرات عالية المؤشر الجلايسيمي: الأرز الأبيض، البطاطس' },
          { en: 'Anti-inflammatory foods: berries, leafy greens', ar: 'أطعمة مضادة للالتهاب: التوت، الخضروات الورقية' }
        ]
      }
    ]
  },
  
  fasting: [
    {
      title: { en: 'Training During Fasting', ar: 'التمرين أثناء الصيام' },
      content: {
        en: 'Training in a fasted state can enhance fat burning through increased lipolysis and growth hormone secretion. However, for sessions longer than 60 minutes, performance may suffer.',
        ar: 'التمرين في حالة الصيام يمكن أن يعزز حرق الدهون من خلال زيادة تكسير الدهون وإفراز هرمون النمو. ومع ذلك، للجلسات التي تزيد عن 60 دقيقة، قد يعاني الأداء.'
      },
      guidelines: [
        { en: 'Best for: Low to moderate intensity cardio', ar: 'الأفضل لـ: كارديو منخفض إلى متوسط الشدة' },
        { en: 'Hydration: Electrolyte supplementation is crucial', ar: 'الترطيب: تكميل الإليكترولايت ضروري' },
        { en: 'Timing: Train at the beginning of your fasting window', ar: 'التوقيت: التمرين في بداية فترة الصيام' }
      ],
      references: [
        { en: 'Van Proeyen et al. (2010). Fasted training glucose tolerance.', ar: 'فان بروين وآخرون (2010). تحمل الجلوكوز أثناء الصيام.' },
        { en: 'Moro et al. (2016). Effects of time-restricted feeding.', ar: 'مورا وآخرون (2016). تأثيرات الصيام المقيد زمنياً.' }
      ]
    }
  ] as FastingSection[]
};
