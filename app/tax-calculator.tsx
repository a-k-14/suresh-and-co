import React, { useState, useCallback } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { colors } from '../src/theme/colors';
import { spacing, radius } from '../src/theme/spacing';

// ─── Tax slab definitions ────────────────────────────────────────────

interface Slab {
    from: number;
    to: number | null;
    rate: number;
}

const NEW_REGIME_SLABS_FY2526: Slab[] = [
    { from: 0, to: 400000, rate: 0 },
    { from: 400000, to: 800000, rate: 5 },
    { from: 800000, to: 1200000, rate: 10 },
    { from: 1200000, to: 1600000, rate: 15 },
    { from: 1600000, to: 2000000, rate: 20 },
    { from: 2000000, to: 2400000, rate: 25 },
    { from: 2400000, to: null, rate: 30 },
];

const NEW_REGIME_SLABS_FY2627: Slab[] = [
    { from: 0, to: 400000, rate: 0 },
    { from: 400000, to: 800000, rate: 5 },
    { from: 800000, to: 1200000, rate: 10 },
    { from: 1200000, to: 1600000, rate: 15 },
    { from: 1600000, to: 2000000, rate: 20 },
    { from: 2000000, to: 2400000, rate: 25 },
    { from: 2400000, to: null, rate: 30 },
];

const OLD_REGIME_SLABS: Slab[] = [
    { from: 0, to: 250000, rate: 0 },
    { from: 250000, to: 500000, rate: 5 },
    { from: 500000, to: 1000000, rate: 20 },
    { from: 1000000, to: null, rate: 30 },
];

const NEW_STD_DEDUCTION = 75000;
const OLD_STD_DEDUCTION = 50000;
const CESS_RATE = 0.04;

// ─── Calculation helpers ─────────────────────────────────────────────

function calculateTaxOnSlabs(taxableIncome: number, slabs: Slab[]): { total: number; breakdown: { slab: string; tax: number }[] } {
    let remaining = taxableIncome;
    let total = 0;
    const breakdown: { slab: string; tax: number }[] = [];

    for (const s of slabs) {
        if (remaining <= 0) break;
        const upper = s.to ?? Infinity;
        const taxable = Math.min(remaining, upper - s.from);
        const tax = taxable * (s.rate / 100);
        total += tax;
        const slabLabel = s.to
            ? `₹${fmt(s.from)} – ₹${fmt(s.to)}`
            : `Above ₹${fmt(s.from)}`;
        breakdown.push({ slab: `${slabLabel} @ ${s.rate}%`, tax });
        remaining -= taxable;
    }

    return { total, breakdown };
}

function fmt(n: number): string {
    if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
    return n.toLocaleString('en-IN');
}

function fmtCurrency(n: number): string {
    return '₹' + Math.round(n).toLocaleString('en-IN');
}

// ─── Main Screen ─────────────────────────────────────────────────────

type FY = '25-26' | '26-27';

export default function TaxCalculatorScreen() {
    const scrollRef = React.useRef<ScrollView>(null);
    useScrollToTop(scrollRef);
    useFocusEffect(useCallback(() => { scrollRef.current?.scrollTo({ y: 0, animated: false }); }, []));

    const [fy, setFy] = useState<FY>('26-27');
    const [grossSalary, setGrossSalary] = useState('');
    const [otherIncome, setOtherIncome] = useState('');
    const [deduction80C, setDeduction80C] = useState('');
    const [deduction80D, setDeduction80D] = useState('');
    const [hra, setHra] = useState('');
    const [calculated, setCalculated] = useState(false);

    // Compute
    const salary = parseFloat(grossSalary) || 0;
    const other = parseFloat(otherIncome) || 0;
    const d80c = Math.min(parseFloat(deduction80C) || 0, 150000);
    const d80d = Math.min(parseFloat(deduction80D) || 0, 100000);
    const hraVal = parseFloat(hra) || 0;
    const totalGross = salary + other;

    // New Regime
    const newSlabs = fy === '26-27' ? NEW_REGIME_SLABS_FY2627 : NEW_REGIME_SLABS_FY2526;
    const newTaxableIncome = Math.max(0, totalGross - NEW_STD_DEDUCTION);
    const newResult = calculateTaxOnSlabs(newTaxableIncome, newSlabs);
    // Section 87A rebate for new regime: if taxable income <= 7L (FY 25-26) or <= 12L (FY 26-27), tax = 0
    const newRebateLimit = fy === '26-27' ? 1200000 : 700000;
    const newTaxBeforeCess = newTaxableIncome <= newRebateLimit ? 0 : newResult.total;
    const newCess = newTaxBeforeCess * CESS_RATE;
    const newTotalTax = newTaxBeforeCess + newCess;

    // Old Regime
    const oldTotalDeductions = OLD_STD_DEDUCTION + d80c + d80d + hraVal;
    const oldTaxableIncome = Math.max(0, totalGross - oldTotalDeductions);
    const oldResult = calculateTaxOnSlabs(oldTaxableIncome, OLD_REGIME_SLABS);
    // Section 87A rebate for old regime: if taxable income <= 5L, tax = 0
    const oldTaxBeforeCess = oldTaxableIncome <= 500000 ? 0 : oldResult.total;
    const oldCess = oldTaxBeforeCess * CESS_RATE;
    const oldTotalTax = oldTaxBeforeCess + oldCess;

    const betterRegime = newTotalTax <= oldTotalTax ? 'New' : 'Old';
    const savings = Math.abs(newTotalTax - oldTotalTax);

    const handleCalculate = () => {
        setCalculated(true);
        setTimeout(() => {
            scrollRef.current?.scrollTo({ y: 600, animated: true });
        }, 200);
    };

    const handleReset = () => {
        setGrossSalary('');
        setOtherIncome('');
        setDeduction80C('');
        setDeduction80D('');
        setHra('');
        setCalculated(false);
    };

    return (
        <SafeAreaView style={styles.safe} edges={['bottom']}>
            <ScrollView
                ref={scrollRef}
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* FY Selector */}
                <View style={styles.fyRow}>
                    {(['25-26', '26-27'] as FY[]).map((year) => (
                        <TouchableOpacity
                            key={year}
                            style={[styles.fyBtn, fy === year && styles.fyBtnActive]}
                            onPress={() => { setFy(year); setCalculated(false); }}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.fyText, fy === year && styles.fyTextActive]}>
                                FY {year}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Income Inputs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Income Details</Text>
                    <InputField
                        label="Annual Salary (CTC)"
                        value={grossSalary}
                        onChangeText={(v) => { setGrossSalary(v); setCalculated(false); }}
                        placeholder="e.g. 1500000"
                    />
                    <InputField
                        label="Other Income"
                        value={otherIncome}
                        onChangeText={(v) => { setOtherIncome(v); setCalculated(false); }}
                        placeholder="e.g. 100000"
                    />
                </View>

                {/* Deductions (Old Regime) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deductions (for Old Regime)</Text>
                    <Text style={styles.sectionHint}>These deductions apply only under the Old Tax Regime</Text>
                    <InputField
                        label="Section 80C (max ₹1.5L)"
                        value={deduction80C}
                        onChangeText={(v) => { setDeduction80C(v); setCalculated(false); }}
                        placeholder="e.g. 150000"
                    />
                    <InputField
                        label="Section 80D (max ₹1L)"
                        value={deduction80D}
                        onChangeText={(v) => { setDeduction80D(v); setCalculated(false); }}
                        placeholder="e.g. 25000"
                    />
                    <InputField
                        label="HRA Exemption"
                        value={hra}
                        onChangeText={(v) => { setHra(v); setCalculated(false); }}
                        placeholder="e.g. 200000"
                    />
                </View>

                {/* Calculate Button */}
                <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate} activeOpacity={0.8}>
                    <Ionicons name="calculator-outline" size={20} color={colors.textOnBlue} />
                    <Text style={styles.calcBtnText}>Calculate Tax</Text>
                </TouchableOpacity>

                {/* Results */}
                {calculated && totalGross > 0 && (
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 400 }}
                    >
                        {/* Recommendation Banner */}
                        <View style={styles.banner}>
                            <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                            <Text style={styles.bannerText}>
                                <Text style={styles.bannerBold}>{betterRegime} Regime</Text> saves you{' '}
                                <Text style={styles.bannerBold}>{fmtCurrency(savings)}</Text>
                            </Text>
                        </View>

                        {/* Side-by-Side Comparison */}
                        <View style={styles.compRow}>
                            {/* New Regime Card */}
                            <View style={[styles.regimeCard, betterRegime === 'New' && styles.regimeCardWinner]}>
                                <Text style={styles.regimeLabel}>New Regime</Text>
                                <Text style={styles.regimeTax}>{fmtCurrency(newTotalTax)}</Text>
                                <View style={styles.regimeDivider} />
                                <DetailRow label="Gross Income" value={fmtCurrency(totalGross)} />
                                <DetailRow label="Std. Deduction" value={`-${fmtCurrency(NEW_STD_DEDUCTION)}`} />
                                <DetailRow label="Taxable Income" value={fmtCurrency(newTaxableIncome)} bold />
                                <DetailRow label="Tax" value={fmtCurrency(newTaxBeforeCess)} />
                                <DetailRow label="Cess (4%)" value={fmtCurrency(newCess)} />
                                {newTaxableIncome <= newRebateLimit && newResult.total > 0 && (
                                    <Text style={styles.rebateNote}>87A Rebate Applied</Text>
                                )}
                            </View>

                            {/* Old Regime Card */}
                            <View style={[styles.regimeCard, betterRegime === 'Old' && styles.regimeCardWinner]}>
                                <Text style={styles.regimeLabel}>Old Regime</Text>
                                <Text style={styles.regimeTax}>{fmtCurrency(oldTotalTax)}</Text>
                                <View style={styles.regimeDivider} />
                                <DetailRow label="Gross Income" value={fmtCurrency(totalGross)} />
                                <DetailRow label="Deductions" value={`-${fmtCurrency(oldTotalDeductions)}`} />
                                <DetailRow label="Taxable Income" value={fmtCurrency(oldTaxableIncome)} bold />
                                <DetailRow label="Tax" value={fmtCurrency(oldTaxBeforeCess)} />
                                <DetailRow label="Cess (4%)" value={fmtCurrency(oldCess)} />
                                {oldTaxableIncome <= 500000 && oldResult.total > 0 && (
                                    <Text style={styles.rebateNote}>87A Rebate Applied</Text>
                                )}
                            </View>
                        </View>

                        {/* Slab Breakdown - New */}
                        <View style={styles.breakdownSection}>
                            <Text style={styles.breakdownTitle}>New Regime Slab Breakdown</Text>
                            {newResult.breakdown.map((b, i) => (
                                <View key={i} style={styles.breakdownRow}>
                                    <Text style={styles.breakdownSlab}>{b.slab}</Text>
                                    <Text style={styles.breakdownTax}>{fmtCurrency(b.tax)}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Slab Breakdown - Old */}
                        <View style={styles.breakdownSection}>
                            <Text style={styles.breakdownTitle}>Old Regime Slab Breakdown</Text>
                            {oldResult.breakdown.map((b, i) => (
                                <View key={i} style={styles.breakdownRow}>
                                    <Text style={styles.breakdownSlab}>{b.slab}</Text>
                                    <Text style={styles.breakdownTax}>{fmtCurrency(b.tax)}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Reset */}
                        <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.8}>
                            <Ionicons name="refresh-outline" size={18} color={colors.brandBlue} />
                            <Text style={styles.resetBtnText}>Reset</Text>
                        </TouchableOpacity>

                        {/* Disclaimer */}
                        <Text style={styles.disclaimer}>
                            This is a simplified estimate. Actual tax may vary based on exemptions, surcharge, and
                            other factors. Please consult a Chartered Accountant for precise calculations.
                        </Text>
                    </MotiView>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Sub-components ──────────────────────────────────────────────────

function InputField({
    label,
    value,
    onChangeText,
    placeholder,
}: {
    label: string;
    value: string;
    onChangeText: (v: string) => void;
    placeholder?: string;
}) {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
            />
        </View>
    );
}

function DetailRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
    return (
        <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, bold && styles.detailBold]}>{label}</Text>
            <Text style={[styles.detailValue, bold && styles.detailBold]}>{value}</Text>
        </View>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.surfaceGrey },
    scroll: { flex: 1 },
    content: { padding: spacing.md, paddingBottom: spacing.xxl },

    // FY selector
    fyRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    fyBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: radius.button,
        borderWidth: 1.5,
        borderColor: colors.brandBlue,
        alignItems: 'center',
    },
    fyBtnActive: {
        backgroundColor: colors.brandBlue,
    },
    fyText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: colors.brandBlue,
    },
    fyTextActive: {
        color: colors.textOnBlue,
    },

    // Section
    section: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.divider,
    },
    sectionTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15,
        color: colors.brandBlue,
        marginBottom: spacing.sm,
    },
    sectionHint: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        fontStyle: 'italic',
    },

    // Inputs
    inputGroup: {
        marginBottom: spacing.sm,
    },
    inputLabel: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 13,
        color: colors.textPrimary,
        marginBottom: 4,
    },
    input: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        color: colors.textPrimary,
        backgroundColor: colors.surfaceGrey,
        borderRadius: radius.input,
        paddingHorizontal: spacing.md,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.divider,
    },

    // Calc button
    calcBtn: {
        backgroundColor: colors.brandBlue,
        borderRadius: radius.button,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    calcBtnText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: colors.textOnBlue,
    },

    // Recommendation banner
    banner: {
        backgroundColor: '#E8F5E9',
        borderRadius: radius.card,
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    bannerText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: colors.textPrimary,
        flex: 1,
    },
    bannerBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    // Side-by-side regime comparison
    compRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    regimeCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.divider,
    },
    regimeCardWinner: {
        borderColor: colors.brandBlue,
        borderWidth: 2,
    },
    regimeLabel: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
        color: colors.brandBlue,
        textAlign: 'center',
        marginBottom: 4,
    },
    regimeTax: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    regimeDivider: {
        height: 1,
        backgroundColor: colors.divider,
        marginBottom: spacing.sm,
    },
    rebateNote: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 11,
        color: '#4CAF50',
        textAlign: 'center',
        marginTop: 4,
    },

    // Detail rows inside regime card
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    detailLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        color: colors.textSecondary,
    },
    detailValue: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 11,
        color: colors.textPrimary,
    },
    detailBold: {
        fontFamily: 'Poppins_600SemiBold',
        color: colors.brandBlue,
    },

    // Slab breakdown
    breakdownSection: {
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.divider,
    },
    breakdownTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: colors.brandBlue,
        marginBottom: spacing.sm,
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    breakdownSlab: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: colors.textPrimary,
        flex: 1,
    },
    breakdownTax: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 12,
        color: colors.textPrimary,
    },

    // Reset
    resetBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: 12,
        marginBottom: spacing.sm,
    },
    resetBtnText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        color: colors.brandBlue,
    },

    // Disclaimer
    disclaimer: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 16,
        paddingHorizontal: spacing.md,
    },
});
